let FuelManager = {
    fuel_types: {},
    main_fuel_id: 0,
    main_waste_id: 0,

    fuelExists: function(fuelID) {
        return fuelID in this.fuel_types;
    },

    getFuelByID: function(fuelID) {
        return this.fuel_types[fuelID];
    },

    getCapByID: function(fuelID) {
        return this.getFuelByID(fuelID).capacity;
    },

    getCountCapByID: function(fuelID) {
        return this.getFuelByID(fuelID).count_by_capacity;
    },

    addFuel: function(itemID, capacity) {
        this.fuel_types[itemID] = {
            capacity: capacity
        }
    },

    setMain(fuelID, wasteID) {
        FuelManager.main_fuel_id = fuelID;
        FuelManager.main_waste_id = wasteID;
    },

    getAddableFuel: function(fuelID, addable_count, count_in_storage, max_count_storage) {
        let max_addable = Math.min(max_count_storage - count_in_storage, addable_count);
        return Math.floor(max_addable / this.getCapByID(fuelID))
    }
}

FuelManager.addFuel(ItemID.yellorium_ingot, 1);
FuelManager.addFuel(BlockID.yellorium_block, 9);
FuelManager.setMain(ItemID.yellorium_ingot, ItemID.cyanite_ingot);

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