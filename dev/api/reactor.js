let ReactorRegister = {
    registerMachine: function(blockID, Prototype) {
        Prototype.client = Prototype.client || {};
        let load = Prototype.client.load || function() {};
        Prototype.client.load = function(){
            let _this = this;
            TileRenderer.mapAtCoords(_this.x, _this.y, _this.z, blockID, BlockSource.getCurrentClientRegion().getBlockData(this.x, this.y, this.z));
            this.networkData.addOnDataChangedListener(function(data, isExternal){
                let data = _this.networkData.getInt("data");
                TileRenderer.mapAtCoords(_this.x, _this.y, _this.z, blockID, data);
            });
            load();
        }
        let unload = Prototype.client.unload || function(){};
		Prototype.client.unload = function(){
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			unload();
		}
		Prototype.getAnimation = Prototype.getAnimation || function(d){return d};
		Prototype.updateAnimation = function(){
			let data = this.blockSource.getBlockData(this.x, this.y, this.z);
			this.networkData.putInt("data", this.getAnimation(data));
			this.networkData.sendChanges();
		}
        TileEntity.registerPrototype(blockID, Prototype);
    }
}
