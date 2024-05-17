#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Tile Windows Automatically
// @raycast.mode silent

// Optional parameters:
// @raycast.icon ↔️
// @raycast.packageName G9MGR

// Documentation:
// @raycast.description manage windows on Odyssey G9
// @raycast.author Elias Kamm
// @raycast.authorURL eliaskamm.com

const SCREEN = { X: 0, Y: 25, Width: 5120, Height: 1415 };
var APPS = ['Spotify.app', 'Arc.app', 'Code.app', 'Warp.app', 'Finder.app'];

//// CODE ////

const MGR = require('node-window-manager').windowManager;
MGR.requestAccessibility();

var Windows = MGR.getWindows(),
    Active = MGR.getActiveWindow(),
    Sides = [];


let center = {
    x: SCREEN.X + SCREEN.Width / 4, y: SCREEN.Y,
    width: SCREEN.Width / 2, height: SCREEN.Height
}

Active.setBounds(center);

setTimeout(() => {
    var Bounds = Active.getBounds();
    
    if (center.width != Bounds.width) {
        center.x += center.width / 2 - Bounds.width / 2;
        Active.setBounds(center);
    }
    if (center.height != Bounds.height) {
        center.y += center.height / 2 - Bounds.height / 2;
        Active.setBounds(center);
    }
    
    APPS.forEach((app) => {
        Windows.forEach((window, j) => {
            if (Active.processId != window.processId && window.path.includes(app) && Sides.length < 2) {
                if (Sides.length == 0) {
                    window.setBounds({
                        x: SCREEN.X + 10,
                        y: SCREEN.Y + 10,
                        width: SCREEN.Width / 2 - Bounds.width / 2 - 20,
                        height: SCREEN.Height - 20
                    });
                }
                else if (Sides[0].processId != window.processId) {
                    window.setBounds({
                        x: SCREEN.X + SCREEN.Width / 2 + Bounds.width / 2 + 10,
                        y: SCREEN.Y + 10,
                        width: SCREEN.Width / 2 - Bounds.width / 2 - 20,
                        height: SCREEN.Height - 20
                    });
                }
                window.bringToTop();
                Sides.push(window);
            }
        });
    });
    
    Active.bringToTop();
    
    let title = Active.getTitle(),
        info = (title != '' && Sides.length != 0) ? `${title} (` : title;
    
    switch (Sides.length) {
        case 1:
            info += `← ${Sides[0].getTitle()}`;
            break;
    
        case 2:
            info += `← ${Sides[0].getTitle()}  ${Sides[1].getTitle()} →`;
            break;
    }
    
    if (title != '' && Sides.length != 0) info += ')';
    console.log(info);
}, 100);
