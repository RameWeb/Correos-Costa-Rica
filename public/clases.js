class tipoProducto{
  constructor(pnombreTipoProducto, pimpuesto){
      this.nombreTipoProducto = pnombreTipoProducto;
      this.impuesto = pimpuesto;  
  }
}

class Courier{
  constructor(pidCourier, pnombreCourier, pempresaCourier){
    this.idCourier = pidCourier,
    this.nombreCourier = pnombreCourier;
    this.empresaCourier = pempresaCourier;
  }
}
     
class Sucursales{
  constructor(pidSucursal, pnombreSucursal, platitude, plongitude, pDireccion, pTelefono){
    this.idSucursal = pidSucursal;
    this.nombreSucursal = pnombreSucursal;
    this.latitude = platitude;
    this.longitude=plongitude;
    this.direccion = pDireccion;
    this.telefono = pTelefono;
    
  }
}

class Prealertas{
  constructor(pTracking, pUrl, pTipoProducto, pValor, pPeso, pCourier){
    this.tracking = pTracking;
    this.url = pUrl;
    this.tipoProducto = pTipoProducto;
    this.valor = pValor;
    this.peso = pPeso;
    this.courier = pCourier;
  }

  getIdentificacion(){
    return this.identificacion;
  }

  getTipoProducto(){
    return this.tipoProducto;
  }

  getTracking(){
    return this.tracking;
  }

  getInfoPrealerta(){
    return `${this.tracking} ${this.tipoProducto}`;
  }

  getCedulaDuenno(){
    return this.identificacion;
  }
}

class ConveniosClientes{
  constructor(pServicio, pCliente, pDireccion, pidConvenio){
    this.servicio = pServicio;
    this.cliente = pCliente;
    this.direccion = pDireccion;
    this.idConvenio = pidConvenio;
  }

}

class Usuario{
  constructor(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario){
    this.tipoIdentificacion = pTipoIdentificacion;
    this.identificacion = pIdentificacion;
    this.nombre1 = pNombre1;
    this.nombre2 = pNombre2;
    this.apellido1 = pApellido1;
    this.apellido2 = pApellido2;
    this.fotoPerfil = pfoto;
    this.sexo = pSexo;
    this.fechaNacimiento = pFechaNacimiento;
    this.email = pEmail;
    this.contrasenna = pContrasenna;
    this.provincia = pProvincia;
    this.canton = pCanton,
    this.distrito = pDistrito;
    this.direccion = pDireccion;
    this.estado = pestado;
    this.tipoUsuario = pTipoUsuario;
  }

  cambiarEstado(pnuevoEstado){
    this.estado = pnuevoEstado;
  }

  getFotoPerfil(){
    return this.fotoPerfil;
  }

  getTipoUsuario(){
    return this.tipoUsuario;
  }

  getCorreo(){
    return this.email;
  }
  
  getPassword(){
    return this.contrasenna;
  }

  getIdentificacion(){
    return this.identificacion;
  }
  
  getDireccion(){
    return this.direccion;
  }

  getRol(){
    return this.tipoUsuario;
  }

  getNombreCompleto(){
    return `${this.nombre1} ${this.apellido1}`;
  }

  getNombre(){
    return this.nombre1;
  }
  
  getFechaNacimiento(){
    return this.fechaNacimiento;
  }
}

class EmpleadoSucursal extends Usuario{
  constructor(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pObjSucursal,pObjRol){
    super(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.sucursal = pObjSucursal;
    this.rol = pObjRol;
  }
}

class EmpleadoAduana extends Usuario{
  constructor(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pRolAduana, pObjRol){
    super(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.rolAduana = pRolAduana;
    this.rol = pObjRol;
  }
}

class Repartidor extends Usuario{
  constructor(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario,pSucursal,pLicencia,pFotoLicencia,pLicenciaVencimiento, pObjRol){
    super(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.sucursal = pSucursal;
    this.licencia = pLicencia;
    this.fotoLicencia = pFotoLicencia;
    this.licenciaVencimiento = pLicenciaVencimiento;
    this.rol = pObjRol;
  }
}

class Cliente extends Usuario{
  constructor(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pTelefono, pSucursalPreferencia, pLat, pLong){
    super(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.telefono = pTelefono;
    this.sucursalPreferencia = pSucursalPreferencia;
    this.tarjetas = [];
    this.prealertas = [];
    this.paquetes = [];
    this.latitud = pLat;
    this.longitud = pLong; 
  }

  agregarTarjeta(pObjTarjeta){
    this.tarjetas.push(pObjTarjeta);
  }

  getTarjeta(){
    return this.tarjetas;
  }

  agregarPrealerta(pnuevaPrealerta) {
    this.prealertas.push(pnuevaPrealerta);
  }

  getCantidadPrealertas(){
    return this.prealertas.length;
  }

  getPrealertas(){
    return this.prealertas;
  }

  getCedula(){
    return this.identificacion;
  }

  setPrealertas(aPrealertas){
    this.prealertas = aPrealertas;
  }

  obtenerLatitud(){
    return this.latitud;
  }

  obtenerLongitud(){
    return this.longitud;
  }

  agregarPrealertas(pnuevaPrealerta) {
    this.prealertas.push(pnuevaPrealerta);
  }

}


/**
 * Clase de la tarjeta
 */
class Tarjeta{
  constructor(ptitulartarjeta, pnumerotarjeta, pmesvencimiento, pannovencimiento, pccv, pidcliente){
    this.titularTarjeta = ptitulartarjeta;
    this.numeroTarjeta = pnumerotarjeta;
    this.mesVencimiento = pmesvencimiento;
    this.annoVencimiento = pannovencimiento;
    this.ccv = pccv;
    this.idCliente = pidcliente;
  }

  getIdCliente(){
    return this.idCliente;
  }

  getNumeroTatjeta(){
    return this.numeroTarjeta;
  }

  getFechaVencimiento(){
    return `${this.mesVencimiento} / ${this.annoVencimiento}`;
  }

  getCcv(){
    return this.ccv;
  }
}

// TODO Dentro de este archivo se crean los objetos con sus respectivos mÃƒÂ©todos

class Convenios{
  constructor(pidConvenios, pTipo, pNombreInstitucion, pTiempo, pCosto ){
    this.idConvenios = pidConvenios;
    this.tipo = pTipo;
    this.nombreInstitucion = pNombreInstitucion;
    this.tiempo = pTiempo;
    this.costo = pCosto;  
  }

  getServicios(){
    return this.tipo;
  }
}

class Paquetes{
  constructor(pTracking, pNombre, pPeso, pValor, pRepartidor, pEstado, pidPaquetes){
    this.tracking = pTracking;
    this.nombre = pNombre;
    this.peso = pPeso;
    this.valor = pValor;
    this.repartidor = pRepartidor;
    this.estado = pEstado;
    this.idPaquetes = pidPaquetes;
    
  }
}
