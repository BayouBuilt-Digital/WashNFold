/* ═══════════════════════════════════════
   WashNFold Admin Dashboard — admin.js
   localStorage-based, offline-capable
   ═══════════════════════════════════════ */

const PASS = 'washnfold2026';
const STATUSES = ['Scheduled','Picked Up','Washing','Folding','Out for Delivery','Delivered'];
const SMS_MSGS = {
  'Picked Up': "Hi {name}! We just picked up your laundry. Sit back — we got this. — WashNFold",
  'Washing': "Hi {name}, your clothes are in the wash right now. — WashNFold",
  'Folding': "Hi {name}, your laundry is being folded. Almost done! — WashNFold",
  'Out for Delivery': "Hi {name}, your fresh laundry is on its way! Leave the bag spot ready. — WashNFold",
  'Delivered': "Hi {name}, your clean clothes are at your door! Dirty clothes out, clean clothes in. — WashNFold"
};

// ── DATA ──
function getData(key) { return JSON.parse(localStorage.getItem('wnf_'+key) || '[]'); }
function setData(key, val) { localStorage.setItem('wnf_'+key, JSON.stringify(val)); }
function genId() { return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2,5); }

// ── LOGIN ──
document.getElementById('loginBtn').addEventListener('click', doLogin);
document.getElementById('loginPass').addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });

function doLogin() {
  var p = document.getElementById('loginPass').value;
  if(p === PASS) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    refreshDashboard();
    renderCustomers();
    renderOrders();
  } else {
    document.getElementById('loginErr').textContent = 'Wrong password';
    document.getElementById('loginPass').style.borderColor = '#ef4444';
  }
}

// ── TABS ──
document.querySelectorAll('.tab').forEach(function(t) {
  t.addEventListener('click', function() { switchTab(t.dataset.tab); });
});

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.toggle('active', t.dataset.tab===tab); });
  document.querySelectorAll('.panel').forEach(function(p) { p.classList.toggle('active', p.id==='tab-'+tab); });
  if(tab==='dashboard') refreshDashboard();
  if(tab==='customers') renderCustomers();
  if(tab==='orders') renderOrders();
  if(tab==='qrgen') populateQRDropdown();
}

// ── DASHBOARD ──
function refreshDashboard() {
  var custs = getData('customers'), orders = getData('orders');
  var active = orders.filter(function(o) { return o.status !== 'Delivered'; });
  var today = new Date().toISOString().split('T')[0];
  var todayOrders = orders.filter(function(o) { return o.date === today; });
  var bagsOut = active.reduce(function(s,o) { return s + (o.bags||1); }, 0);
  document.getElementById('statCustomers').textContent = custs.length;
  document.getElementById('statOrders').textContent = active.length;
  document.getElementById('statBags').textContent = bagsOut;
  document.getElementById('statToday').textContent = todayOrders.length;
}

// ── CUSTOMERS ──
function renderCustomers() {
  var custs = getData('customers');
  var search = (document.getElementById('custSearch').value || '').toLowerCase();
  var list = document.getElementById('customerList');
  var filtered = custs.filter(function(c) {
    return !search || c.name.toLowerCase().includes(search) || (c.phone||'').includes(search) || (c.email||'').toLowerCase().includes(search);
  });
  if(!filtered.length) { list.innerHTML = '<div class="empty">No customers yet</div>'; return; }
  list.innerHTML = filtered.map(function(c) {
    var tags = [];
    if(c.day) tags.push(c.day);
    if(c.spot) tags.push(c.spot);
    if(c.city) tags.push(c.city + ' ' + (c.zip||''));
    return '<div class="cust-card" data-id="'+c.id+'">' +
      '<div class="cust-name">'+esc(c.name)+'</div>' +
      '<div class="cust-meta">' +
        '<span>Phone:</span> '+esc(c.phone||'—') + ' &nbsp;·&nbsp; <span>Email:</span> '+esc(c.email||'—') + '<br>' +
        '<span>Address:</span> '+esc(c.address||'—') +
        (c.gate ? '<br><span>Gate:</span> '+esc(c.gate) : '') +
        (c.allergies ? '<br><span>Allergies:</span> '+esc(c.allergies) : '') +
        (c.notes ? '<br><span>Notes:</span> '+esc(c.notes) : '') +
      '</div>' +
      '<div class="cust-tags">'+tags.map(function(t){return '<span class="cust-tag">'+esc(t)+'</span>';}).join('')+'</div>' +
      '<div class="cust-actions">' +
        '<button onclick="editCustomer(\''+c.id+'\')">Edit</button>' +
        '<button class="del" onclick="deleteCustomer(\''+c.id+'\')">Delete</button>' +
      '</div></div>';
  }).join('');
}

function showCustomerForm(id) {
  document.getElementById('custModal').style.display = 'flex';
  document.getElementById('custFormTitle').textContent = id ? 'Edit Customer' : 'Add Customer';
  var form = document.getElementById('custForm');
  form.reset();
  document.getElementById('cf-id').value = '';
  if(id) {
    var c = getData('customers').find(function(x){return x.id===id;});
    if(c) {
      document.getElementById('cf-id').value = c.id;
      document.getElementById('cf-name').value = c.name||'';
      document.getElementById('cf-phone').value = c.phone||'';
      document.getElementById('cf-email').value = c.email||'';
      document.getElementById('cf-address').value = c.address||'';
      document.getElementById('cf-city').value = c.city||'Maurice';
      document.getElementById('cf-zip').value = c.zip||'70555';
      document.getElementById('cf-day').value = c.day||'Monday';
      document.getElementById('cf-spot').value = c.spot||'Front Door';
      document.getElementById('cf-gate').value = c.gate||'';
      document.getElementById('cf-allergies').value = c.allergies||'';
      document.getElementById('cf-notes').value = c.notes||'';
    }
  }
}

function editCustomer(id) { showCustomerForm(id); }

function saveCustomer(e) {
  e.preventDefault();
  var custs = getData('customers');
  var id = document.getElementById('cf-id').value;
  var data = {
    name: document.getElementById('cf-name').value,
    phone: document.getElementById('cf-phone').value,
    email: document.getElementById('cf-email').value,
    address: document.getElementById('cf-address').value,
    city: document.getElementById('cf-city').value,
    zip: document.getElementById('cf-zip').value,
    day: document.getElementById('cf-day').value,
    spot: document.getElementById('cf-spot').value,
    gate: document.getElementById('cf-gate').value,
    allergies: document.getElementById('cf-allergies').value,
    notes: document.getElementById('cf-notes').value
  };
  if(id) {
    custs = custs.map(function(c) { return c.id===id ? Object.assign(c, data) : c; });
  } else {
    data.id = genId();
    data.created = new Date().toISOString();
    custs.push(data);
  }
  setData('customers', custs);
  closeModal('custModal');
  renderCustomers();
  refreshDashboard();
}

function deleteCustomer(id) {
  if(!confirm('Delete this customer?')) return;
  var custs = getData('customers').filter(function(c){return c.id!==id;});
  setData('customers', custs);
  renderCustomers();
  refreshDashboard();
}

// ── ORDERS ──
var currentFilter = 'all';

function filterOrders(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.of').forEach(function(b){b.classList.remove('active');});
  if(btn) btn.classList.add('active');
  renderOrders();
}

function renderOrders() {
  var orders = getData('orders'), custs = getData('customers');
  var filtered = currentFilter==='all' ? orders : orders.filter(function(o){return o.status===currentFilter;});
  filtered.sort(function(a,b){ return new Date(b.created) - new Date(a.created); });
  var list = document.getElementById('orderList');
  if(!filtered.length) { list.innerHTML = '<div class="empty">No orders</div>'; return; }
  list.innerHTML = filtered.map(function(o) {
    var cust = custs.find(function(c){return c.id===o.custId;}) || {name:'Unknown',phone:''};
    var badgeClass = 'badge-' + o.status.toLowerCase().replace(/ /g,'').replace('pickedup','pickedup').replace('outfordelivery','delivering');
    if(o.status==='Picked Up') badgeClass='badge-pickedup';
    if(o.status==='Out for Delivery') badgeClass='badge-delivering';
    var nextStatus = STATUSES[STATUSES.indexOf(o.status)+1];
    var smsMsg = SMS_MSGS[o.status] ? SMS_MSGS[o.status].replace('{name}',cust.name.split(' ')[0]) : '';
    return '<div class="order-card">' +
      '<div class="order-top">' +
        '<div class="order-cust">'+esc(cust.name)+'</div>' +
        '<div class="order-badge '+badgeClass+'">'+esc(o.status)+'</div>' +
      '</div>' +
      '<div class="order-meta">' +
        (o.bags||1)+' bag'+(o.bags>1?'s':'') + ' · ' + (o.date||'No date') + ' · ' + (o.time||'') +
        (o.notes ? ' · '+esc(o.notes) : '') +
      '</div>' +
      '<div class="order-actions">' +
        (nextStatus ? '<button class="btn-advance" onclick="advanceOrder(\''+o.id+'\')">'+nextStatus+' →</button>' : '<span style="font-size:12px;color:var(--green);font-weight:800">✓ Complete</span>') +
        (smsMsg && cust.phone ? '<button class="btn-sms" onclick="sendSMS(\''+cust.phone+'\',\''+encodeURIComponent(smsMsg)+'\')">Send SMS</button>' : '') +
      '</div></div>';
  }).join('');
}

function showOrderForm() {
  var custs = getData('customers');
  var sel = document.getElementById('of-cust');
  sel.innerHTML = '<option value="">Select customer...</option>' + custs.map(function(c){
    return '<option value="'+c.id+'">'+esc(c.name)+'</option>';
  }).join('');
  document.getElementById('of-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('orderModal').style.display = 'flex';
}

function saveOrder(e) {
  e.preventDefault();
  var orders = getData('orders');
  orders.push({
    id: genId(),
    custId: document.getElementById('of-cust').value,
    bags: parseInt(document.getElementById('of-bags').value) || 1,
    date: document.getElementById('of-date').value,
    time: document.getElementById('of-time').value,
    notes: document.getElementById('of-notes').value,
    status: 'Scheduled',
    created: new Date().toISOString()
  });
  setData('orders', orders);
  closeModal('orderModal');
  renderOrders();
  refreshDashboard();
}

function advanceOrder(id) {
  var orders = getData('orders');
  orders = orders.map(function(o) {
    if(o.id===id) {
      var idx = STATUSES.indexOf(o.status);
      if(idx < STATUSES.length-1) o.status = STATUSES[idx+1];
    }
    return o;
  });
  setData('orders', orders);
  renderOrders();
  refreshDashboard();
}

function sendSMS(phone, msg) {
  var clean = phone.replace(/[^0-9+]/g,'');
  window.open('sms:'+clean+'?body='+msg, '_self');
}

// ── QR SCANNER ──
var scanning = false;
var videoStream = null;

function toggleScanner() {
  if(scanning) { stopScanner(); } else { startScanner(); }
}

function startScanner() {
  var video = document.getElementById('scanVideo');
  var canvas = document.getElementById('scanCanvas');
  var ctx = canvas.getContext('2d');
  document.getElementById('scanBtn').textContent = 'Stop Camera';
  document.getElementById('scanResult').style.display = 'none';
  scanning = true;

  navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}}).then(function(stream) {
    videoStream = stream;
    video.srcObject = stream;
    video.play();
    requestAnimationFrame(function tick() {
      if(!scanning) return;
      if(video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height);
        if(code) {
          stopScanner();
          handleScan(code.data);
          return;
        }
      }
      requestAnimationFrame(tick);
    });
  }).catch(function(err) {
    alert('Camera access denied: ' + err.message);
    scanning = false;
    document.getElementById('scanBtn').textContent = 'Start Camera';
  });
}

function stopScanner() {
  scanning = false;
  document.getElementById('scanBtn').textContent = 'Start Camera';
  if(videoStream) { videoStream.getTracks().forEach(function(t){t.stop();}); videoStream = null; }
}

function handleScan(data) {
  var result = document.getElementById('scanResult');
  try {
    var parsed = JSON.parse(data);
    var custs = getData('customers');
    var cust = custs.find(function(c){return c.id===parsed.custId || c.name===parsed.customer;});
    if(cust) {
      var orders = getData('orders').filter(function(o){return o.custId===cust.id && o.status!=='Delivered';});
      result.innerHTML = '<h3>'+esc(cust.name)+'</h3>' +
        '<div class="sr-row"><span class="sr-label">Bag ID</span><span>'+esc(parsed.id||'—')+'</span></div>' +
        '<div class="sr-row"><span class="sr-label">Phone</span><span>'+esc(cust.phone||'—')+'</span></div>' +
        '<div class="sr-row"><span class="sr-label">Address</span><span>'+esc(cust.address||'—')+', '+esc(cust.city||'')+' '+esc(cust.zip||'')+'</span></div>' +
        '<div class="sr-row"><span class="sr-label">Pickup</span><span>'+esc(cust.day||'—')+' · '+esc(cust.spot||'—')+'</span></div>' +
        '<div class="sr-row"><span class="sr-label">Gate Code</span><span>'+esc(cust.gate||'None')+'</span></div>' +
        '<div class="sr-row"><span class="sr-label">Allergies</span><span>'+esc(cust.allergies||'None')+'</span></div>' +
        '<div class="sr-row"><span class="sr-label">Notes</span><span>'+esc(cust.notes||'None')+'</span></div>' +
        '<div class="sr-row"><span class="sr-label">Active Orders</span><span>'+orders.length+'</span></div>';
    } else {
      result.innerHTML = '<h3>Bag Scanned</h3><div class="sr-row"><span class="sr-label">Data</span><span>'+esc(data)+'</span></div><div class="empty">Customer not found in system</div>';
    }
  } catch(e) {
    result.innerHTML = '<h3>QR Code</h3><div class="sr-row"><span class="sr-label">Raw</span><span>'+esc(data)+'</span></div>';
  }
  result.style.display = 'block';
}

// ── QR GENERATOR ──
function populateQRDropdown() {
  var custs = getData('customers');
  var sel = document.getElementById('qr-cust');
  sel.innerHTML = '<option value="">Select customer...</option>' + custs.map(function(c){
    return '<option value="'+c.id+'" data-name="'+esc(c.name)+'" data-phone="'+esc(c.phone||'')+'">'+esc(c.name)+'</option>';
  }).join('');
}

function autoGenBagId() {
  var bags = getData('bags');
  var num = bags.length + 1;
  document.getElementById('qr-bagid').value = 'WNF-' + String(num).padStart(3,'0');
}

function generateQR() {
  var custSel = document.getElementById('qr-cust');
  var bagId = document.getElementById('qr-bagid').value.trim();
  if(!custSel.value || !bagId) { alert('Select a customer and enter a bag ID'); return; }
  var opt = custSel.options[custSel.selectedIndex];
  var custName = opt.dataset.name;
  var custPhone = opt.dataset.phone;

  var qrData = JSON.stringify({id:bagId, custId:custSel.value, customer:custName, phone:custPhone});

  var qr = qrcode(0, 'M');
  qr.addData(qrData);
  qr.make();

  document.getElementById('qrImage').innerHTML = qr.createImgTag(6, 8);
  document.getElementById('qrInfo').innerHTML = '<strong>'+esc(bagId)+'</strong> — '+esc(custName)+'<br><small>'+esc(custPhone)+'</small>';
  document.getElementById('qrOutput').style.display = 'block';

  // Save bag registration
  var bags = getData('bags');
  bags.push({id:bagId, custId:custSel.value, customer:custName, created:new Date().toISOString()});
  setData('bags', bags);
}

function printQR() {
  var content = document.getElementById('qrOutput').innerHTML;
  var w = window.open('','','width=400,height=500');
  w.document.write('<html><head><title>WashNFold QR</title><style>body{font-family:sans-serif;text-align:center;padding:20px}img{max-width:250px}</style></head><body>'+content+'</body></html>');
  w.document.close();
  w.print();
}

// ── DATA EXPORT / IMPORT ──
function exportData() {
  var data = {
    customers: getData('customers'),
    orders: getData('orders'),
    bags: getData('bags'),
    exported: new Date().toISOString()
  };
  var blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'washnfold-backup-'+new Date().toISOString().split('T')[0]+'.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importData(e) {
  var file = e.target.files[0];
  if(!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    try {
      var data = JSON.parse(ev.target.result);
      if(data.customers) setData('customers', data.customers);
      if(data.orders) setData('orders', data.orders);
      if(data.bags) setData('bags', data.bags);
      alert('Data imported successfully! '+
        (data.customers?data.customers.length:0)+' customers, '+
        (data.orders?data.orders.length:0)+' orders, '+
        (data.bags?data.bags.length:0)+' bags');
      refreshDashboard();
      renderCustomers();
      renderOrders();
    } catch(err) {
      alert('Invalid file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ── MODAL UTILS ──
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function esc(s) { var d=document.createElement('div'); d.textContent=s||''; return d.innerHTML; }

// ── SERVICE WORKER ──
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(function(){});
}
