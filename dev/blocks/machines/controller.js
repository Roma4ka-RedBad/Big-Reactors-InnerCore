IDRegistry.genBlockID("reactor_controller");
Block.createBlock("reactor_controller", [
    {
        name: "Reactor Controller",
        texture: [["reactor.plate", 0], ["reactor.plate", 0], ["reactor.plate", 0], ["controller.off", 0], ["reactor.plate", 0], ["reactor.plate", 0]],
        inCreative: true
    }
], BLOCK_TYPE_MACHINE);
ToolAPI.registerBlockMaterial(BlockID.reactor_controller, "stone");
Utils.createBlockRotations(BlockID.reactor_controller, [
    [2, [["reactor.plate", 0], ["reactor.plate", 0], ["reactor.plate", 0], ["controller.off", 0], ["reactor.plate", 0], ["reactor.plate", 0]]],
    [6, [["reactor.plate", 0], ["reactor.plate", 0], ["reactor.plate", 0], ["controller.active", 0], ["reactor.plate", 0], ["reactor.plate", 0]]]
]);

let controller_gui = new UI.StandardWindow({
    standard: {
        header: { text: { text: Translation.translate("Reactor Controll") } },
        inventory: { standard: true },
        background: { standard: true }
    },
    drawing: [
        // scales
        { type: "bitmap", x: 450, y: 5, bitmap: "reactor.coil", scale: 5.5 },
        { type: "bitmap", x: 600, y: 5, bitmap: "reactor.fueltemperature", scale: 5.5 },
        { type: "bitmap", x: 750, y: 5, bitmap: "reactor.casingtemperature", scale: 5.5 },
        { type: "bitmap", x: 900, y: 5, bitmap: "reactor.energystored", scale: 5.5 },

        // default values
        { type: "text", text: "100 %", x: 450, y: 130, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 25 } },
        { type: "bitmap", x: 450, y: 135, bitmap: "reactor.fuel_scale", scale: 6 },
        { type: "text", text: "0 %", x: 470, y: 550, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 25 } },
        { type: "text", text: "1000 °C", x: 600, y: 130, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 25 } },
        { type: "bitmap", x: 600, y: 135, bitmap: "reactor.heat_scale", scale: 6 },
        { type: "text", text: "0 °C", x: 620, y: 550, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 25 } },
        { type: "text", text: "1000 °C", x: 750, y: 130, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 25 } },
        { type: "bitmap", x: 750, y: 135, bitmap: "reactor.heat_scale", scale: 6 },
        { type: "text", text: "0 °C", x: 770, y: 550, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 25 } },
        { type: "text", text: "10.000.000", x: 900, y: 130, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 15 } },
        { type: "bitmap", x: 900, y: 135, bitmap: "reactor.energy_scale", scale: 6 },
        { type: "text", text: "0 RF", x: 920, y: 550, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 25 } },

        // left panel
        { type: "bitmap", x: 0, y: 50, bitmap: "reactor.temperature", scale: 4 },
        { type: "line", x1: 0, y1: 125, x2: 400, y2: 125, width: 5 },
        { type: "bitmap", x: 0, y: 150, bitmap: "reactor.energyoutput", scale: 4 },
        { type: "line", x1: 0, y1: 225, x2: 400, y2: 225, width: 5 },
        { type: "bitmap", x: 0, y: 250, bitmap: "reactor.fuelusagerate", scale: 4 },
        { type: "line", x1: 0, y1: 325, x2: 400, y2: 325, width: 5 },
        { type: "bitmap", x: 0, y: 350, bitmap: "reactor.reactivity", scale: 4 },
        { type: "line", x1: 0, y1: 425, x2: 400, y2: 425, width: 5 },
        { type: "text", text: "Status:", x: 0, y: 480, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 45 } }
    ],
    elements: {
        // scales
        fuel_yellorium: { type: "scale", x: 450, y: 135, direction: 1, value: 0, bitmap: "reactor.fuel_yellorium", scale: 6 },
        fuel_cyanite: { type: "scale", x: 450, y: 135, direction: 1, value: 0, bitmap: "reactor.fuel_cyanite", scale: 6 },
        heatbar_fuel: { type: "scale", x: 600, y: 135, direction: 1, value: 0, bitmap: "reactor.heat", scale: 6 },
        heatbar_casing: { type: "scale", x: 750, y: 135, direction: 1, value: 0, bitmap: "reactor.heat", scale: 6 },
        energy_scale: { type: "scale", x: 900, y: 135, direction: 1, value: 0, bitmap: "reactor.energy", scale: 6 },

        // texts
        temperature: { type: "text", text: "0 °C", x: 100, y: 65, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 40 } },
        energyoutput: { type: "text", text: "0 RF/t", x: 100, y: 165, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 40 } },
        fuelusagerate: { type: "text", text: "0.000 mB/t", x: 100, y: 265, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 40 } },
        reactivity: { type: "text", text: "0 %", x: 100, y: 365, width: 300, height: 100, font: { color: android.graphics.Color.BLACK, size: 40 } },
        status: { type: "text", text: "Offline", x: 200, y: 435, width: 300, height: 100, font: { color: android.graphics.Color.RED, size: 45 } },

        // buttons
        button_eject: {
            type: "button", x: 0, y: 500, bitmap: "wasteeject_off", scale: 5, clicker: {
                onClick: function (position, container) {
                    SoundPool.select("button_tap").play();
                    container.sendEvent("buttonAnswer", { data: "autoeject", "value": true })
                }
            }
        },
        button_manual: {
            type: "button", x: 100, y: 500, bitmap: "wastemanual_off", scale: 5, clicker: {
                onClick: function (position, container) {
                    SoundPool.select("button_tap").play();
                    container.sendEvent("buttonAnswer", { data: "autoeject", value: false })
                }
            }
        },
        button_on: {
            type: "button", x: 0, y: 600, bitmap: "on_off", scale: 5, clicker: {
                onClick: function (position, container) {
                    SoundPool.select("button_tap").play();
                    container.sendEvent("buttonAnswer", { data: "status", value: true })
                }
            }
        },
        button_off: {
            type: "button", x: 100, y: 600, bitmap: "off_off", scale: 5, clicker: {
                onClick: function (position, container) {
                    SoundPool.select("button_tap").play();
                    container.sendEvent("buttonAnswer", { data: "status", value: false })
                }
            }
        },
    }
});

ReactorRegister.registerMachine(BlockID.reactor_controller, {
    useNetworkItemContainer: true,
    defaultValues: {
        status: false,
        autoeject: true,
        fuel: {
            count: 0,
            waste_count: 0
        },
        structure: {
            status: false,
            reason: ""
        },
        energy: {
            max: 1000000000,
            buffer: 0
        },
        temperature: {
            casing: 0,
            fuelrods: 0
        }
    },

    getScreenName: function (player, coords) {
        if (!this.data.structure.status) {
            let client = Network.getClientForPlayer(player);
            if (client) client.send("BigReactors.message", { type: "default", text: this.data.structure.reason });
            return false;
        }
        return "main";
    },

    getScreenByName: function (screenName) {
        return controller_gui;
    },

    containerEvents: {
        buttonAnswer: function (packetData) {
            this.data[packetData.data] = packetData.value
        }
    },

    getAnimation(data) {
        if (this.data.status)
            return data + 4;
        return data
    },
    
    checkPowertaps() {
        for (let index = 0; index < this.data.structure.powertaps.length; index++) {
            let tile = this.data.structure.powertaps[index].tile;
            tile.data.status = this.data.status;
            if (tile.data.energy < tile.getEnergyStorage()) {
                tile.data.energy += Math.min(tile.getEnergyStorage(), this.data.energy.buffer);
                this.data.energy.buffer -= Math.min(tile.getEnergyStorage(), this.data.energy.buffer);
            }
        }
    },
    
    checkAccessports() {
        for (let index = 0; index < this.data.structure.accessports.length; index++) {
            let tile = this.data.structure.accessports[index].tile;
            if (tile.data.is_inlet) {
                let input_slot = tile.container.getSlot("input_slot");
                if (FuelManager.fuelExists(input_slot.id)) {
                    let addable = FuelManager.getAddableFuel(input_slot.id, input_slot.count * FuelManager.getCapByID(input_slot.id), this.data.fuel.count, this.data.structure.fuelrods * 4);
                    this.data.fuel.count += addable * FuelManager.getCapByID(input_slot.id);
                    tile.container.setSlot("input_slot", input_slot.id, input_slot.count-addable, input_slot.data);
                    tile.container.validateSlot("input_slot");
                }
            }

            if (!tile.data.is_inlet || this.data.structure.accessports.length == 1) {
                let output_slot = tile.container.getSlot("output_slot");
                if (this.data.autoeject)
                    this.data.fuel.waste_count -= Utils.addToSlot(tile.container, output_slot, [0, FuelManager.main_waste_id], FuelManager.main_waste_id, this.data.fuel.waste_count, 0);
            }

            if (tile.data.get_fuel) {
                tile.data.get_fuel = false;
                let output_slot = tile.container.getSlot("output_slot");
                this.data.fuel.count -= Utils.addToSlot(tile.container, output_slot, [0, FuelManager.main_fuel_id], FuelManager.main_fuel_id, this.data.fuel.count, 0);
            }

            if (tile.data.get_waste) {
                tile.data.get_waste = false;
                let output_slot = tile.container.getSlot("output_slot");
                this.data.fuel.waste_count -= Utils.addToSlot(tile.container, output_slot, [0, FuelManager.main_waste_id], FuelManager.main_waste_id, this.data.fuel.waste_count, 0);
            }
            
            tile.container.sendChanges();
        }
    },

    tick: function () {
        if (World.getThreadTime() % __config__.getInteger("interface_update_rate") == 0) {
            this.data.structure.status = MultiBlock.can("reactor", this);
            this.container.sendEvent("updateGuiInfo", {status: this.data.status, autoeject: this.data.autoeject});
            if (this.data.structure.status) {
                this.updateAnimation();
                this.checkAccessports();
                this.checkPowertaps();
                if (this.data.fuel.count >= 0.5 && this.data.status) {
                    this.data.energy.buffer += 100;
                    this.data.fuel.count -= 0.5;
                    this.data.fuel.waste_count += 0.5;
                }
                this.container.setScale("fuel_yellorium", this.data.fuel.count / (this.data.structure.fuelrods * 4));
                this.container.setScale("energy_scale", this.data.energy.buffer / this.data.energy.max);
                this.container.setScale("fuel_cyanite", this.data.fuel.waste_count / (this.data.structure.fuelrods * 4));
                this.container.setScale("heatbar_casing", this.data.temperature.casing / 1000);
                this.container.setScale("heatbar_fuel", this.data.temperature.fuelrods / 1000);
                this.container.sendChanges();
            }
        }
    },

    client: {
        containerEvents: {
            updateGuiInfo: function (container, window, windowContent, eventData) {
                if (windowContent) {
                    if (eventData.status) {
                        windowContent.elements.status.text = "Online";
                        windowContent.elements.status.font.color = android.graphics.Color.GREEN;
                        windowContent.elements.button_on.bitmap = "on_on";
                        windowContent.elements.button_off.bitmap = "off_off";
                    } else {
                        windowContent.elements.status.text = "Offline";
                        windowContent.elements.status.font.color = android.graphics.Color.RED;
                        windowContent.elements.button_on.bitmap = "on_off";
                        windowContent.elements.button_off.bitmap = "off_on";
                    }

                    if (eventData.autoeject) {
                        windowContent.elements.button_manual.bitmap = "wastemanual_off";
                        windowContent.elements.button_eject.bitmap = "wasteeject_on";
                    } else {
                        windowContent.elements.button_manual.bitmap = "wastemanual_on";
                        windowContent.elements.button_eject.bitmap = "wasteeject_off";
                    }
                }
            }
        }
    }
});

MultiBlock.register("reactor", [
    BlockID.reactor_plate,
    BlockID.reactor_glass,
    BlockID.reactor_controller,
    BlockID.reactor_controlrod,
    BlockID.reactor_accessport,
    BlockID.reactor_powertap
], [
    BlockID.reactor_fuelrod, 
    BlockID.cyanite_block,
    BlockID.graphite_block,
    VanillaBlockID.diamond_block,
    VanillaBlockID.iron_block,
    VanillaBlockID.gold_block,
    VanillaTileID.water
], {
    start(tile, min, max, blocks) {
        tile.data.structure.min = min;
        tile.data.structure.max = max;
        tile.data.structure.accessports = [];
        tile.data.structure.powertaps = [];
        tile.data.structure.controllers = 0;
        tile.data.structure.fuelrods = 0;
        tile.data.structure.controlrods = 0;
    },
    isCenter(tile, x, y, z, id) {
        switch (id) {
            case BlockID.reactor_fuelrod:
                tile.data.structure.fuelrods++;
        }
        return true
    },
    isSide(tile, x, y, z, id) {
        switch (id) {
            case BlockID.reactor_accessport:
                let _tile = TileEntity.getTileEntity(x, y, z, tile.blocksource);
                if (!_tile) _tile = TileEntity.addTileEntity(x, y, z, tile.blocksource);
                tile.data.structure.accessports.push({ x: x, y: y, z: z, tile: _tile })
                return true;
                
            case BlockID.reactor_powertap:
                let __tile = TileEntity.getTileEntity(x, y, z, tile.blocksource);
                if (!__tile) __tile = TileEntity.addTileEntity(x, y, z, tile.blocksource);
                tile.data.structure.powertaps.push({ x: x, y: y, z: z, tile: __tile })
                return true;

            case BlockID.reactor_controlrod:
                tile.data.structure.controlrods++;
                if (tile.data.structure.max.y == y) {
                    rods_bottom_control = true;
                    for (let _y = y - 1; _y > tile.data.structure.min.y; _y--) {
                        if (tile.blockSource.getBlockId(x, _y, z) != BlockID.reactor_fuelrod) {
                            tile.data.structure.reason = Translation.translate("Structure error!") + ` X: ${x} Y: ${_y} Z: ${z}`;
                            rods_bottom_control = false
                        }
                    }
                    return rods_bottom_control;
                } else {
                    tile.data.structure.reason = Translation.translate("Structure error!") + ` X: ${x} Y: ${y} Z: ${z}`;
                    return false
                }

            case BlockID.reactor_controlrod:
            case BlockID.reactor_glass:
            case BlockID.reactor_plate:
                return true;
        }
        tile.data.structure.controllers++;
        return tile.data.structure.controllers == 1
    },
    end(tile, min, max, blocks, result) {
        if (result) {
            tile.data.structure.reason = ""
        } else {
            if (tile.data.structure.fuelrods / (max.y - min.y - 1) != tile.data.structure.controlrods) {
                tile.data.structure.reason = Translation.translate("Structure error! The number of fuelrods and controllers does not match!");
                return false
            }
            tile.data.structure.reason = Translation.translate("Structure error! The structure has invalid blocks or incorrect shape!");
        }
    }
}, {
    x: 3,
    y: 3,
    z: 3
})
