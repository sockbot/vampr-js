class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let distance = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      distance++;
    }
    return distance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal)
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    console.log("This.name:", this.name)
    console.log("Name:", name)
    if (this.name === name) {
      return this;
    }
    for (const child of this.offspring) {
      if (child.vampireWithName(name)) {
        return child.vampireWithName(name);
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;
    for (const child of this.offspring) {
      total++;
      total = total + child.totalDescendents;
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];
    if (this.yearConverted > 1980) {
      millennials.push(this);
    }
    for (const child of this.offspring) {
      millennials = millennials.concat(child.allMillennialVampires);
    }
    return millennials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let ancestors1 = this.allAncestors;
    let ancestors2 = vampire.allAncestors;
    let commonAncestors = ancestors1.filter(ancestor => {
      return ancestors2.includes(ancestor);
    });
    return commonAncestors[0];
  }

  get allAncestors() {
    let ancestors = [this]; // include self in list of ancestors
    let currentVamp = this;
    while (currentVamp.creator) {
      ancestors.push(currentVamp.creator);
      currentVamp = currentVamp.creator;
    }
    ancestors.push(currentVamp); // push root ancestor (root doesn't have a creator)
    return ancestors;
  }
}

module.exports = Vampire;

