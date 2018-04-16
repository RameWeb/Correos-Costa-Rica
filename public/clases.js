class tipoProducto{
  constructor(pnombreTipoProducto, pimpuesto){
      this.nombreTipoProducto = pnombreTipoProducto;
      this.impuesto = pimpuesto;  
  }
}

class courier{
  constructor(pnombreCourier){
      this.nombreCourier = pnombreCourier;
  }
}

class provincia{
  constructor(pnombreProvincia){
      this.nombreProvincia = pnombreProvincia; 
  }
}

class canton{
  constructor(pnombreCanton){
    this.nombreCanton = pnombreCanton;
  }
}
     
class Sucursales{
  constructor(pProvincia, pCanton, pDistrito, pDireccion, pTelefono, pidSucursal, pEstado){
    this.provincia = pProvincia;
    this.canton = pCanton;
    this.distrito = pDistrito;
    this.direccion = pDireccion;
    this.telefono = pTelefono;
    this.idSucursal = pidSucursal;
    this.estadoSucursal = pEstado;
  }
}

class Prealertas{
  constructor(pTracking, pUrl, pTipoProducto, pValor, pPeso, pCourier, pEstado){
    this.tracking = pTracking;
    this.url = pUrl;
    this.tipoProducto = pTipoProducto;
    this.valor = pValor;
    this.peso = pPeso;
    this.courier = pCourier;
    this.estado = pEstado; 
  }

  getTipoProducto(){
    return this.tipoProducto;
  }

  gettracking(){
    return this.tracking;
  }

  getInfoPrealerta(){
    return `${this.tracking} ${this.tipoProducto}`;
  }

  getCedulaDuenno(){
    return this.idCliente;
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

  getTipoUsuario(){
    return this.tipoUsuario;
  }

  getEmail(){
    return this.email;
  }
  
  getPassword(){
    return this.contrasenna;
  }

  getRol(){
    return this.tipoUsuario;
  }

  getNombreCompleto(){
    return `${this.nombre} ${this.apellido1}`;
  }
}

class EmpleadoSucursal extends Usuario{
  constructor(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pObjSucursal){
    super(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.sucursal = pObjSucursal;
  }
}

class EmpleadoAduana extends Usuario{
  constructor(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pRolAduana){
    super(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.rolAduana = pRolAduana;
  }
}

class Repartidor extends Usuario{
  constructor(ppTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pTelefono,pSucursal,pLicencia,pFotoLicencia,pLicenciaVencimiento){
    super(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.telefono = pTelefono;
    this.sucursal = pSucursal;
    this.licencia = pLicencia;
    this.fotoLicencia = pFotoLicencia;
    this.licenciaVencimiento = pLicenciaVencimiento;
  }
}

class Cliente extends Usuario{
  constructor(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pTelefono, pSucursalPreferencia, pLat, pLong){
    super(pTipoIdentificacion, pIdentificacion, pNombre1, pNombre2, pApellido1, pApellido2, pfoto, pSexo, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.telefono = pTelefono;
    this.sucursalPreferencia = pSucursalPreferencia;
    this.tarjetas = [];
    this.prealertas = [];
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
class Licencia{
    constructor(pTipo,pCategoria,pDescripcion){
      this.tipo = pTipo;
      this.categoria = pCategoria;
      this.descripcion = pDescripcion;
  }
}

class EstadoPaquete{
  constructor(pEstadoPaquete){
    this.estadoPaquete = pEstadoPaquete;
}
}

class Convenios{
  constructor(pNombreInstitucion, pTipo, pTiempo, pCosto, pidConvenios){
    this.nombreInstitucion = pNombreInstitucion;
    this.tipo = pTipo;
    this.tiempo = pTiempo;
    this.costo = pCosto;
    this.idConvenios = pidConvenios;
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

class Casillero{
  constructor(pidRandom){
    this.idRandom = pidRandom;
    
  }
}
