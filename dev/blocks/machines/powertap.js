IDRegistry.genBlockID("reactor_powertap");
Block.createBlock("reactor_powertap", [{
    name: "Reactor Powertap", 
    texture: [["powertap.off", 0], ["reactor.plate", 0], ["powertap.off", 0], ["powertap.off", 0], ["powertap.off", 0], ["powertap.off", 0]],
    inCreative: true
}], BLOCK_TYPE_MACHINE);
ToolAPI.registerBlockMaterial(BlockID.reactor_powertap, "stone");
Utils.createBlockRotations(BlockID.reactor_powertap, [
    [0, [["powertap.off", 0], ["reactor.plate", 0], ["powertap.off", 0], ["powertap.off", 0], ["powertap.off", 0], ["powertap.off", 0]]],
    [1, [["powertap.on", 0], ["reactor.plate", 0], ["powertap.on", 0], ["powertap.on", 0], ["powertap.on", 0], ["powertap.on", 0]]]
]);

ReactorRegister.registerMachine(BlockID.reactor_powertap, {
    useNetworkItemContainer: true,
    defaultValues: {
        status: false,
        energy: 0
    },
    getAnimation(data) {
        return +this.data.status;
    },
    canReceiveEnergy: function(side, type) {
        return false;
    },
    getCapacity: function(){
        return 1000;
    },
    tick: function () {
        if (World.getThreadTime() % 10 == 0)
            this.updateAnimation();
    },
    energyTick: function(type, src){
        var output = Math.min(1000, this.data.energy);
        this.data.energy += src.add(output) - output;
    },
});

EnergyTileRegistry.addEnergyTypeForId(BlockID.reactor_powertap, RF_energy);
EnergyTileRegistry.addEnergyTypeForId(BlockID.reactor_powertap, EU_energy);
ICRender.getGroup("ic-wire").add(BlockID.reactor_powertap, -1);
ICRender.getGroup("rf-wire").add(BlockID.reactor_powertap, -1);
ICRender.getGroup("fc-wire").add(BlockID.reactor_powertap, -1);