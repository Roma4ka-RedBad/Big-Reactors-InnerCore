IMPORT("Multiblock");
IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("ConnectedTexture");
IMPORT("StorageInterface");

Network.addClientPacket("BigReactors.message", function (data) {
    if (data.type == 'default') {
        Game.message(data.text);
    } else if (data.type == 'tip') {
        Game.tipMessage(data.text);
    }
});

let RF_energy = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
let EU_energy = EnergyTypeRegistry.assureEnergyType("Eu", 1);