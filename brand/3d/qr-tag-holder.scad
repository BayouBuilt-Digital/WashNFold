// ═══════════════════════════════════════════
// WashNFold QR Tag Holder
// 3D Printable — attach to customer laundry bags
// ═══════════════════════════════════════════
// Print settings: 0.2mm layer, 100% infill, PLA or PETG
// Insert QR sticker into front recess
// Washer icon embossed on back
// Zip tie or keyring through top hole

$fn = 64; // smoothness

// ── DIMENSIONS ──
tag_w = 45;
tag_h = 55;
tag_d = 3.5;
corner_r = 4;

qr_size = 28;
qr_depth = 1.2;
qr_x = (tag_w - qr_size) / 2;
qr_y = 8;

hole_r = 2.5;
hole_cy = tag_h - 5;

washer_w = 22;
washer_h = 26;
washer_x = (tag_w - washer_w) / 2;
washer_y = tag_h - washer_h - 6;
door_r = 8;
door_cy = washer_y + washer_h * 0.45;

// ── MAIN BODY ──
difference() {
    union() {
        // Rounded rectangle body
        hull() {
            translate([corner_r, corner_r, 0])
                cylinder(r=corner_r, h=tag_d);
            translate([tag_w - corner_r, corner_r, 0])
                cylinder(r=corner_r, h=tag_d);
            translate([corner_r, tag_h - corner_r, 0])
                cylinder(r=corner_r, h=tag_d);
            translate([tag_w - corner_r, tag_h - corner_r, 0])
                cylinder(r=corner_r, h=tag_d);
        }

        // QR border frame (raised on front)
        translate([qr_x - 1.5, qr_y - 1.5, tag_d])
            difference() {
                cube([qr_size + 3, qr_size + 3, 0.6]);
                translate([1.5, 1.5, -0.1])
                    cube([qr_size, qr_size, 0.8]);
            }

        // Mounting hole reinforcement
        translate([tag_w/2, hole_cy, tag_d])
            cylinder(r=hole_r + 1.5, h=0.8);
    }

    // QR sticker recess (front)
    translate([qr_x, qr_y, tag_d - qr_depth])
        cube([qr_size, qr_size, qr_depth + 0.1]);

    // Mounting hole (through)
    translate([tag_w/2, hole_cy, -0.1])
        cylinder(r=hole_r, h=tag_d + 2);

    // ── WASHER ICON (embossed on back) ──
    // Washer body outline
    translate([washer_x, washer_y, -0.1])
        difference() {
            cube([washer_w, washer_h, 0.7]);
            translate([1.2, 1.2, -0.1])
                cube([washer_w - 2.4, washer_h - 2.4, 0.9]);
        }

    // Control panel line
    translate([washer_x + 2, washer_y + washer_h * 0.78, -0.1])
        cube([washer_w - 4, 0.8, 0.7]);

    // Control knobs
    for (kx = [washer_x + 4, tag_w/2, washer_x + washer_w - 4]) {
        translate([kx, washer_y + washer_h * 0.88, -0.1])
            cylinder(r=1.2, h=0.7);
    }

    // Door circle
    translate([tag_w/2, door_cy, -0.1])
        difference() {
            cylinder(r=door_r, h=0.7);
            translate([0, 0, -0.1])
                cylinder(r=door_r - 1.2, h=0.9);
        }

    // Inner door rim
    translate([tag_w/2, door_cy, -0.1])
        difference() {
            cylinder(r=door_r - 2, h=0.5);
            translate([0, 0, -0.1])
                cylinder(r=door_r - 2.8, h=0.7);
        }

    // Bubbles inside door
    translate([tag_w/2, door_cy - 2, -0.1])
        difference() {
            cylinder(r=3, h=0.5);
            cylinder(r=2.2, h=0.7);
        }
    translate([tag_w/2 - 4, door_cy - 5, -0.1])
        difference() {
            cylinder(r=1.8, h=0.5);
            cylinder(r=1.2, h=0.7);
        }
    translate([tag_w/2 + 4.5, door_cy - 4, -0.1])
        difference() {
            cylinder(r=1.6, h=0.5);
            cylinder(r=1, h=0.7);
        }
}
