IDRegistry.genBlockID("reactor_powertap");
Block.createBlock("reactor_powertap", [{
    name: "Reactor Powertap", 
    texture: [["powertap.off", 0], ["reactor.plate", 0], ["powertap.off", 0], ["powertap.off", 0], ["powertap.off", 0], ["powertap.off", 0]],
    inCreative: true
}], BLOCK_TYPE_MACHINE);
ToolAPI.registerBlockMaterial(BlockID.reactor_powertap, "stone");
Utils.createBlockRotations(BlockID.reactor_powertap, [
    [2, [["powertap.off", 0], ["reactor.plate", 0], ["powertap.off", 0], ["powertap.off", 0], ["powertap.off", 0], ["powertap.off", 0]]],
    [6, [["powertap.on", 0], ["reactor.plate", 0], ["powertap.on", 0], ["powertap.on", 0], ["powertap.on", 0], ["powertap.on", 0]]]
]);

ReactorRegister.registerMachine(BlockID.reactor_powertap, {
    useNetworkItemContainer: true,
    defaultValues: {
        status: false,
        energy: 0
    },
    
    getAnimation(data) {
        if (this.data.status)
            return data + 4;
        return data
    },
    
    canReceiveEnergy: function(side, type) {
        return false;
    },

    getEnergyStorage: function(){
        return 1000;
    },

    tick: function () {
        if (World.getThreadTime() % __config__.getInteger("interface_update_rate") == 0)
            this.updateAnimation();
    },

    energyTick: function(type, src){
        var output = Math.min(1000, this.data.energy);
        this.data.energy += src.add(output) - output;
    }
});

EnergyTileRegistry.addEnergyTypeForId(BlockID.reactor_powertap, RF_energy);
EnergyTileRegistry.addEnergyTypeForId(BlockID.reactor_powertap, EU_energy);
ICRender.getGroup("ic-wire").add(BlockID.reactor_powertap, -1);
ICRender.getGroup("rf-wire").add(BlockID.reactor_powertap, -1);
ICRender.getGroup("fc-wire").add(BlockID.reactor_powertap, -1);