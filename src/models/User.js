const User = function (firebaseUser){
    let m = {
        displayName: '',
        email: '',
        photoULR: '',
        uid: '',
    }

    if(firebaseUser){
        m.displayName = firebaseUser.displayName ? firebaseUser.displayName : '';
        m.email = firebaseUser.email ? firebaseUser.email : '';
        m.photoULR = firebaseUser.photoULR ? firebaseUser.photoULR : '';
        m.uid = firebaseUser.uid ? firebaseUser.uid : '';
    }
    return m;
}

export default User;