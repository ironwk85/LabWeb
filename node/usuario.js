// Constructor
function Usuario(id,nombre,ap1,ap2,fechaNac,genero,noCel,noTel,ext,email,pass) {
  // always initialize all instance properties
  this.id = id;
  this.nombre = nombre;
  this.ap1 = ap1;
  this.ap2 = ap2;
  this.fechaNac = fechaNac;
  this.genero = genero;
  this.noCel = noCel;
  this.noTel = noTel;
  this.ext = ext;
  this.email = email;
  this.pass = pass;
}

// export the class
module.exports = Usuario;
