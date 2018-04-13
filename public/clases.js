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
  constructor(pProvincia, pCanton, pDistrito, pDireccion, pLatLong, pTelefono, pidSucursal, pEstado){
    this.provincia = pProvincia;
    this.canton = pCanton;
    this.distrito = pDistrito;
    this.direccion = pDireccion;
    this.latLong = pLatLong;
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
  constructor(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario){
    this.identificacion = pIdentificacion;
    this.nombre = pNombre;
    this.apellido1 = pApellido1;
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
  constructor(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pObjSucursal, pLicencia, pFotoLicencia, pVencimientoLicencia){
    super(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.sucursal = pObjSucursal;
  }
}

class EmpleadoAduana extends Usuario{
  constructor(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pRolAduana){
    super(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.rolAduana = pRolAduana;
  }
}

class Repartidor extends Usuario{
  constructor(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pTelefono,pSucursal,pLicencia,pFotoLicencia,pLicenciaVencimiento){
    super(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.telefono = pTelefono;
    this.sucursal = pSucursal;
    this.licencia = pLicencia;
    this.fotoLicencia = pFotoLicencia;
    this.licenciaVencimiento = pLicenciaVencimiento;
  }
}

class Cliente extends Usuario{
  constructor(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario, pTelefono){
    super(pIdentificacion, pNombre, pApellido1, pFechaNacimiento, pEmail, pContrasenna, pProvincia, pCanton, pDistrito, pDireccion, pestado, pTipoUsuario);
    this.telefono = pTelefono;
    this.tarjeta = [];
  }

  agregarTarjeta(pObjTarjeta){
    this.tarjeta.push(pObjTarjeta);
  }

  getTarjeta(){
    return this.tarjeta;
  }
}

class Tarjeta{
  constructor(pTitularTarjeta, pNumeroTarjeta, pFechaVencimiento, pCcv){
    this.titularTarjeta = pTitularTarjeta;
    this.numeroTarjeta = pNumeroTarjeta;
    this.fechaVencimiento = pFechaVencimiento;
    this.ccv = pCcv;
  }
}

// TODO Dentro de este archivo se crean los objetos con sus respectivos mÃƒÂ©todos
class Direccion{
  constructor(pProvincia,pCanton,pDistrito){
    this.provincia = pProvincia;
    this.canton = pCanton;
    this.distrito = pDistrito;
  }
}

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
