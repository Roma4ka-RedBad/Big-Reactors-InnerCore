IDRegistry.genBlockID("reactor_fuelrod");
Block.createBlockWithRotation("reactor_fuelrod", [{name: "Reactor Fuelrod", texture: [
	["fuelrod.end", 0], ["fuelrod.end", 0], 
	["fuelrod.side", 0], ["fuelrod.side", 0], 
	["fuelrod.side", 0], ["fuelrod.side", 0]
], inCreative: true}], BLOCK_TYPE_GLASS);

IDRegistry.genBlockID("reactor_controlrod");
Block.createBlockWithRotation("reactor_controlrod", [{name: "Reactor Controlrod", texture: [
	["reactor.plate", 0], ["controlrod", 0], 
	["reactor.plate", 0], ["reactor.plate", 0], 
	["reactor.plate", 0], ["reactor.plate", 0]
], inCreative: true}], BLOCK_TYPE_MACHINE);

/*TileEntity.registerPrototype(BlockID.reactor_fuelrod, {
	defaultValues: {
        fuel: 0
	},

	tick: function() {
        let render = new ICRender.Model();
		let face = BlockRenderer.createModel();
		let fuel = BlockRenderer.createModel();
		face.addBox(0/16, 0/16, 0/16, 0/16, 16/16, 16/16, "fuelrod.side", 0);
		face.addBox(0/16, 0/16, 0/16, 16/16, 16/16, 0/16, "fuelrod.side", 0);
		face.addBox(16/16, 0/16, 16/16, 0/16, 16/16, 16/16, "fuelrod.side", 0);
		face.addBox(16/16, 0/16, 16/16, 16/16, 16/16, 0/16, "fuelrod.side", 0);
		face.addBox(0/16, 0/16, 0/16, 16/16, 0/16, 16/16, "fuelrod.end", 0);
		face.addBox(0/16, 16/16, 0/16, 16/16, 16/16, 16/16, "fuelrod.end", 0);
		render.addEntry(face);

		fuel.addBox(1/16, 0/16, 1/16, 15/16, this.data.fuel/16, 15/16, "blockyellorium", 0);
		render.addEntry(fuel);
		BlockRenderer.enableCoordMapping(BlockID.reactor_fuelrod, -1, render)
		BlockRenderer.mapAtCoords(this.x, this.y, this.z, render)

		if (this.data.fuel == 15) {
			this.data.fuel = 0
		} else {
			this.data.fuel += 1/20
		}
    }
})*/
