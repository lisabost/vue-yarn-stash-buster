function Yarn(name, length, color, weight, fiber) {
    this.name = name ?? '';
    this.length = length ?? 0;
    this.color = color ?? '';
    this.weight = weight ?? '';
    this.fiber = fiber ?? '';

    this.toString = function () {
        return this.name;
    }

    this.toFirestore = function (){
        return {
            name: this.name,
            length: this.length,
            color: this.color,
            weight: this.weight,
            fiber: this.fiber
        }
    }
}

Yarn.collectionName = 'yarn';

Yarn.fromFirestore = function (snapshot, options){
    let data = snapshot.data(options);
    const yarn = new Yarn(data.name, data.length, data.color, data.weight, data.fiber)

    yarn._id = snapshot.id;
    yarn._path = snapshot.ref.path;

    return yarn;
}

export default Yarn;