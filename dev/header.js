IMPORT("Multiblock");
IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("SoundAPI");
IMPORT("ConnectedTexture");
IMPORT("StorageInterface");

Network.addClientPacket("BigReactors.message", function (data) {
    if (data.type == 'default') {
        Game.message(data.text);
    } else if (data.type == 'tip') {
        Game.tipMessage(data.text);
    }
});

const SoundPool = new SoundAPI("Big-Reactors");
SoundPool.registerSound("button_tap", {
	source: __dir__ + "resources/sounds/button.ogg",
	sync: false,
});

let RF_energy = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
let EU_energy = EnergyTypeRegistry.assureEnergyType("Eu", 1);