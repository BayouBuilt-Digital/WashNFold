// ═══════════════════════════════════════════
// WashNFold QR Tag Holder
// 3D Printable — attach to customer laundry bags
// ═══════════════════════════════════════════
//
// COLOR SCHEME:
//   Body:  WHITE filament (clean, fresh look)
//   Text + Washer + Accents: Brand Green-Blue (#64B5F6 or #7CC444)
//
// HOW TO PRINT DUAL COLOR:
//   1. Slice with 0.2mm layers
//   2. Body prints in WHITE filament
//   3. At the raised text/accent layer (layer ~18, around 3.5mm),
//      pause print and swap to GREEN-BLUE filament
//   4. The raised "WashNFold", "LAUNDRY", accent stripes,
//      and QR border will print in brand color
//   5. Resume print
//
//   OR: Use a multi-material printer (Bambu AMS, Prusa MMU)
//       Body = white, raised features = green-blue
//
//   OR: Single color in white, paint raised features with
//       acrylic paint in #64B5F6 or #7CC444
//
// Print: 0.2mm layer, 100% infill, PLA or PETG
// Dimensions: 50mm x 70mm x 4.3mm (with raised text)
// ═══════════════════════════════════════════

$fn = 64;

// ── DIMENSIONS ──
tag_w = 50;
tag_h = 70;
tag_d = 3.5;
corner_r = 5;

qr_size = 30;
qr_depth = 1.2;
qr_x = (tag_w - qr_size) / 2;
qr_y = 14;

hole_r = 2.5;
hole_cy = tag_h - 6;

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

        // ── FRONT: Raised "WashNFold" text at top ──
        translate([tag_w/2, tag_h - 14, tag_d])
            linear_extrude(0.8)
                text("WashNFold", size=6.5, font="Liberation Sans:style=Bold",
                     halign="center", valign="center");

        // ── FRONT: QR border frame ──
        translate([qr_x - 1.5, qr_y - 1.5, tag_d])
            difference() {
                cube([qr_size + 3, qr_size + 3, 0.6]);
                translate([1.5, 1.5, -0.1])
                    cube([qr_size, qr_size, 0.8]);
            }

        // ── FRONT: Raised "LAUNDRY" below QR ──
        translate([tag_w/2, 5, tag_d])
            linear_extrude(0.6)
                text("LAUNDRY", size=3.5, font="Liberation Sans:style=Bold",
                     halign="center", valign="center", spacing=1.4);

        // Mounting hole reinforcement ring
        translate([tag_w/2, hole_cy, tag_d])
            difference() {
                cylinder(r=hole_r + 2, h=1);
                translate([0, 0, -0.1])
                    cylinder(r=hole_r, h=1.2);
            }
    }

    // ── QR sticker recess ──
    translate([qr_x, qr_y, tag_d - qr_depth])
        cube([qr_size, qr_size, qr_depth + 0.1]);

    // ── Mounting hole ──
    translate([tag_w/2, hole_cy, -0.1])
        cylinder(r=hole_r, h=tag_d + 3);

    // ═══ BACK: WASHER ICON (embossed) ═══

    washer_w = 24;
    washer_h = 28;
    washer_x = (tag_w - washer_w) / 2;
    washer_y = 22;
    door_r = 8.5;
    door_cy = washer_y + washer_h * 0.42;

    // Washer body outline
    translate([washer_x, washer_y, -0.1])
        difference() {
            cube([washer_w, washer_h, 0.8]);
            translate([1.3, 1.3, -0.1])
                cube([washer_w - 2.6, washer_h - 2.6, 1]);
        }

    // Rounded corners on washer body
    translate([washer_x + 2, washer_y + 2, -0.1])
        cylinder(r=2, h=0.8);
    translate([washer_x + washer_w - 2, washer_y + 2, -0.1])
        cylinder(r=2, h=0.8);
    translate([washer_x + 2, washer_y + washer_h - 2, -0.1])
        cylinder(r=2, h=0.8);
    translate([washer_x + washer_w - 2, washer_y + washer_h - 2, -0.1])
        cylinder(r=2, h=0.8);

    // Control panel divider
    translate([washer_x + 2, washer_y + washer_h * 0.76, -0.1])
        cube([washer_w - 4, 0.9, 0.8]);

    // Control knobs (3)
    for (kx = [washer_x + 5, tag_w/2, washer_x + washer_w - 5]) {
        translate([kx, washer_y + washer_h * 0.87, -0.1])
            cylinder(r=1.3, h=0.8);
    }

    // Door circle (outer ring)
    translate([tag_w/2, door_cy, -0.1])
        difference() {
            cylinder(r=door_r, h=0.8);
            cylinder(r=door_r - 1.3, h=1);
        }

    // Door inner rim
    translate([tag_w/2, door_cy, -0.1])
        difference() {
            cylinder(r=door_r - 2.2, h=0.5);
            cylinder(r=door_r - 3, h=0.7);
        }

    // Bubbles inside door
    translate([tag_w/2, door_cy - 1.5, -0.1])
        difference() { cylinder(r=3.2, h=0.5); cylinder(r=2.4, h=0.7); }
    translate([tag_w/2 - 4.5, door_cy - 4.5, -0.1])
        difference() { cylinder(r=2, h=0.5); cylinder(r=1.3, h=0.7); }
    translate([tag_w/2 + 5, door_cy - 3.5, -0.1])
        difference() { cylinder(r=1.8, h=0.5); cylinder(r=1.1, h=0.7); }
    translate([tag_w/2 - 3, door_cy + 5, -0.1])
        difference() { cylinder(r=1.5, h=0.5); cylinder(r=0.9, h=0.7); }

    // ── BACK: Embossed "WashNFold" text ──
    translate([tag_w/2, tag_h - 14, -0.1])
        mirror([1,0,0])
            linear_extrude(0.8)
                text("WashNFold", size=5.5, font="Liberation Sans:style=Bold",
                     halign="center", valign="center");

    // ── BACK: Tagline ──
    translate([tag_w/2, 8, -0.1])
        mirror([1,0,0])
            linear_extrude(0.6)
                text("DIRTY CLOTHES OUT", size=2.5, font="Liberation Sans:style=Bold",
                     halign="center", valign="center", spacing=1.2);
    translate([tag_w/2, 4, -0.1])
        mirror([1,0,0])
            linear_extrude(0.6)
                text("CLEAN CLOTHES IN", size=2.5, font="Liberation Sans:style=Bold",
                     halign="center", valign="center", spacing=1.2);

    // ── BACK: Small glass bubble decorations ──
    translate([8, tag_h - 8, -0.1]) cylinder(r=3, h=0.4);
    translate([tag_w - 8, 16, -0.1]) cylinder(r=2.5, h=0.4);
    translate([6, 18, -0.1]) cylinder(r=1.8, h=0.4);
    translate([tag_w - 6, tag_h - 10, -0.1]) cylinder(r=2, h=0.4);
}
