#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Tile Window to Left Split
// @raycast.mode silent

// Optional parameters:
// @raycast.icon ↙️
// @raycast.packageName G9MGR

// Documentation:
// @raycast.description manage windows on Odyssey G9
// @raycast.author Elias Kamm
// @raycast.authorURL eliaskamm.com

const SCREEN = { X: 0, Y: 25, Width: 5120, Height: 1415 };

//// CODE ////

const MGR = require('node-window-manager').windowManager;
MGR.requestAccessibility();

let split = (SCREEN.Width / 4) * 1.5;

var Active = MGR.getActiveWindow(),
    Position = {
        x: 0, y: SCREEN.Y,
        width: split, height: SCREEN.Height
    };

Active.setBounds(Position);