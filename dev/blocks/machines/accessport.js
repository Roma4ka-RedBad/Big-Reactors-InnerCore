IDRegistry.genBlockID("reactor_accessport");
Block.createBlock("reactor_accessport", [{
    name: "Reactor Accessport", 
    texture: [["accessport.input", 0], ["accessport.input", 0], ["accessport.input", 0], ["accessport.input", 0], ["accessport.input", 0], ["accessport.input", 0]],
    inCreative: true
}], BLOCK_TYPE_MACHINE);
ToolAPI.registerBlockMaterial(BlockID.reactor_accessport, "stone");
Utils.createBlockRotations(BlockID.reactor_accessport, [
    [0, [["accessport.input", 0], ["accessport.input", 0], ["accessport.input", 0], ["accessport.input", 0], ["accessport.input", 0], ["accessport.input", 0]]],
    [1, [["accessport.output", 0], ["accessport.output", 0], ["accessport.output", 0], ["accessport.output", 0], ["accessport.output", 0], ["accessport.output", 0]]]
]);

let accessport_gui = new UI.StandardWindow({
    standard: {
        header: { text: { text: "Reactor Accessport" } },
        inventory: { standard: true },
        background: { standard: true }
    },
    elements: {
        input_slot: { type: "slot", x: 130, y: 70, size: 50 },
        output_slot: { type: "slot", x: 330, y: 70, size: 50 },

        fuel_eject: {
            type: "button", x: 200, y: 170, bitmap: "fueleject", scale: 3, clicker: {
                onClick: function (position, container) {
                    container.sendEvent("buttonAnswer", { data: "get_fuel", value: true })
                }
            }
        },
        waste_eject: {
            type: "button", x: 260, y: 170, bitmap: "wasteeject", scale: 3, clicker: {
                onClick: function (position, container) {
                    container.sendEvent("buttonAnswer", { data: "get_waste", value: true })
                }
            }
        },
        button_inlet: {
            type: "button", x: 360, y: 170, bitmap: "inlet_on", scale: 3, clicker: {
                onClick: function (position, container) {
                    container.sendEvent("buttonAnswer", { data: "is_inlet", value: true })
                }
            }
        },
        button_outlet: {
            type: "button", x: 420, y: 170, bitmap: "outlet_off", scale: 3, clicker: {
                onClick: function (position, container) {
                    container.sendEvent("buttonAnswer", { data: "is_inlet", value: false })
                }
            }
        }
    }
})

ReactorRegister.registerMachine(BlockID.reactor_accessport, {
    useNetworkItemContainer: true,
    defaultValues: {
        is_inlet: true,
        get_fuel: false,
        get_waste: false
    },

    getScreenName: function (player, coords) {
        return "main";
    },

    getScreenByName: function (screenName) {
        return accessport_gui;
    },

    client: {
        containerEvents: {
            updateGuiInfo: function (container, window, windowContent, eventData) {
                if (windowContent) {
                    if (eventData.is_inlet) {
                        windowContent.elements.button_inlet.bitmap = "inlet_on";
                        windowContent.elements.button_outlet.bitmap = "outlet_off";
                    } else {
                        windowContent.elements.button_inlet.bitmap = "inlet_off";
                        windowContent.elements.button_outlet.bitmap = "outlet_on";
                    }
                }
            }
        }
    },

    containerEvents: {
        buttonAnswer: function (packetData) {
            this.data[packetData.data] = packetData.value;
        }
    },

    getAnimation(data) {
        return +!this.data.is_inlet;
    },

    tick: function () {
        StorageInterface.checkHoppers(this);
        if (World.getThreadTime() % 10 == 0) {
            this.updateAnimation();
            this.container.sendEvent("updateGuiInfo", this.data);
        }
    }

});

StorageInterface.createInterface(BlockID.reactor_accessport, {
    slots: {
        input_slot: {
            input: true,
            isValid: function (item, side, tileEntity) {
                if (tileEntity.data.is_inlet && FUELDATA.fuelExists(item.id))
                    return true;
            }
        },
        output_slot: {
            output: true,
            canOutput: function (item, side, tileEntity) {
                if (!tileEntity.data.is_inlet)
                    return true;
            }
        },
    }
});