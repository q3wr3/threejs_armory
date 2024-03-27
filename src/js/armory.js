import Helmet from './armor/Helmet';
import ChestPlate from './armor/ChestPlate';
import Gauntlets from './armor/Gauntlets';
import ShoulderGuard from './armor/ShoulderGuard';
import Sabatons from './armor/Sabatons';
import Bracers from './armor/Bracers';
import Sword from './weapon/Sword';
import Shield from './weapon/Shield';
import Staff from './weapon/Staff';
import Hammer from './weapon/Hammer';
import Dagger from './weapon/Dagger';
import Axe from './weapon/Axe';



class Armory {
  constructor() {
    this.weapons = [];
    this.tools = [];
    this.armors = []; // Add an array to store armor pieces
  }

  // Method to add a weapon
  addWeapon(weaponClass, ...params) {
    const weapon = new weaponClass(...params);
    const weaponData = this.convertToJSON(weapon);
    this.weapons.push(weaponData);
    return weaponData; // Return the JSON data for immediate use if needed
  }

  // Method to add a tool
  addTool(toolClass, ...params) {
    const tool = new toolClass(...params);
    const toolData = this.convertToJSON(tool);
    this.tools.push(toolData);
    return toolData; // Return the JSON data for immediate use if needed
  }

  // New method to add armor
  addArmor(armorClass, ...params) {
    const armor = new armorClass(...params);
    const armorData = this.convertToJSON(armor);
    this.armors.push(armorData);
    return armorData; // Return the JSON data for immediate use if needed
  }

  // Convert weapon, tool, or armor instance to JSON
  convertToJSON(instance) {
    const json = {};
    for (const [key, value] of Object.entries(instance)) {
      if (typeof value !== 'function') {
        json[key] = value;
      }
    }
    return json;
  }

  // Example method to retrieve all weapons
  getAllWeapons() {
    return this.weapons;
  }

  // Example method to retrieve all tools
  getAllTools() {
    return this.tools;
  }

  // New method to retrieve all armors
  getAllArmors() {
    return this.armors;
  }
}
module.exports = { Armory };