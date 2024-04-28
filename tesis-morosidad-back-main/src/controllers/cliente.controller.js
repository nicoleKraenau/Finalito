import { pool } from "../db.js";
///////este essssssssssssssssssssssssssss
  export const getAlldistritos = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM Distrito ");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getDistrito = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM Distrito WHERE id_distrito= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Distrito no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAllregion = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM Region");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getRegion = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM Region WHERE id_region= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Region no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAllusuario = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM usuario");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };
  export const getAllestado = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM estado_civil ");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getEstado = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM estado_civil WHERE id_estado_civil= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Estado civil no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAlleducativo = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM nivel_educativo ");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getEducativo = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM nivel_educativo WHERE id_nivel_educativo= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Nivel educativo no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAllmotivo= async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM motivo_prestamo ");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getMotivo = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM motivo_prestamo WHERE id_motivo_prestamo= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Motivo no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAllClientes = async (req, res, next) => {
    try {
      const {userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente WHERE id_usuario = $1`, [userId]);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getCliente = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM cliente WHERE id_cliente = $1 `, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyNivelEducativo = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_niveleducativo = $1 
      AND id_usuario = $2 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
`, [id,userId]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyNivelEducativoDistrito = async (req, res, next) => {
    try {
      const {id, distrito,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_niveleducativo = $1 
      AND id_distrito = $2 
      AND id_usuario = $3 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
      `, [id, distrito,userId]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyNivelEducativoRegion = async (req, res, next) => {
    try {
      const {id, region,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE cliente.id_niveleducativo = $1 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2 
      AND region.id_region = $2
      and id_usuario=$3;`, [id, region,userId]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyMotivo = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_motivo = $1 
      AND id_usuario = $2 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;`, [id,userId]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyMotivoDistrito = async (req, res, next) => {
    try {
      const {id, distrito,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_motivo = $1 AND id_distrito = $2 and id_usuario=$3
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;`, [id, distrito,userId]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyMotivoRegion = async (req, res, next) => {
    try {
      const {id, region,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE cliente.id_motivo = $1 
      AND region.id_region = $2 
      and id_usuario=$3
      AND EXTRACT(YEAR FROM age(cliente.fecha_nacimiento)) < 27 
      AND cliente.cantidad_propiedades < 2;
      `, [id, region,userId]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyEstadoCivil = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_estadocivil = $1
      AND id_usuario = $2 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
      `, [id,userId]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyEstadoCivilDistrito = async (req, res, next) => {
    try {
      const {id, distrito,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_estadocivil = $1 
      AND id_distrito = $2 
      AND id_usuario = $3
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
      `, [id, distrito,userId]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyEstadoCivilRegion = async (req, res, next) => {
    try {
      const {id, region,userId} = req.params;
      const result = await pool.query(`SELECT * 
      FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE cliente.id_estadocivil = $1 
        AND region.id_region = $2 
        and id_usuario =$3
        AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
        AND cantidad_propiedades < 2;
      `, [id, region,userId]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyDistrito = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_distrito = $1 
      AND id_usuario = $2
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;`, [id, userId]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getAllClientesbyDistrito = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_distrito = $1 
      and id_usuario=$2
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2`, [id,userId]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyRegion = async (req, res, next) => {
    try {
      const {id, userId} = req.params;
      const result = await pool.query(`SELECT * 
      FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE region.id_region = $1
      AND id_usuario = $2
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2`, [id , userId]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getAllClientesbyRegion = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * 
      FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE region.id_region = $1
      and id_usuario=$2
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
      `, [id,userId]);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getDistritosbyRegion = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * FROM distrito
      WHERE id_region = $1
      AND id_distrito IN (
        SELECT id_distrito FROM cliente
       
        WHERE EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27
        and id_usuario=$2
        AND cantidad_propiedades < 2);
      
      `, [id,userId]);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  }; 

  export const getClientsbyDNI = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente WHERE dni ILIKE $1 and id_usuario = $2 `, [`%${id}%`, userId]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };
  export const getClientsbyDNIigual = async (req, res, next) => {
    try {
      const {id,userId} = req.params;
      const result = await pool.query(`SELECT * FROM cliente WHERE dni=$1 and id_usuario = $2 `, [id, userId]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };
  export const createcliente = async (req, res, next) => {
    try {
      const {
        nombre_cliente,
        dni,
        fecha_nacimiento,
        cantidad_propiedades,
        cantidad_hijos,
        genero,
        id_distrito,
        id_usuario,// Supongamos que esto es el nombre del distrito
       // Supongamos que esto es el nombre del usuario
        id_estadocivil, // Supongamos que esto es el tipo de estado civil
        id_niveleducativo, // Supongamos que esto es el nivel educativo
        salario,
        deudas,
        id_motivo, // Supongamos que esto es el motivo del préstamo
      } = req.body;

    
      const nuevocliente = await pool.query(
        "INSERT INTO cliente(nombre_cliente, dni, fecha_nacimiento, cantidad_propiedades, cantidad_hijos, genero,id_distrito, id_usuario, id_estadocivil, id_niveleducativo, salario, deudas, id_motivo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
        [
          nombre_cliente,
          dni,
          fecha_nacimiento,
          cantidad_propiedades,
          cantidad_hijos,
          genero,
          id_distrito.id_distrito, 
          id_usuario.id_usuario,
          id_estadocivil.id_estadocivil,
          id_niveleducativo.id_niveleducativo,
          salario,
          deudas,
          id_motivo.id_motivo,
          
        ]
       
      );
      console.log(nombre_cliente,dni)
      console.log('c')
      // Devolver la respuesta completa
      res.json(nuevocliente.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);    
    }
  };
  export const createcliente1 = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const {
        nombre_cliente,
        dni,
        fecha_nacimiento,
        cantidad_propiedades,
        cantidad_hijos,
        genero,
        id_distrito,
        id_usuario,
        // Supongamos que esto es el nombre del distrito
       // Supongamos que esto es el nombre del usuario
        id_estadocivil, // Supongamos que esto es el tipo de estado civil
        id_niveleducativo, // Supongamos que esto es el nivel educativo
        salario,
        deudas,
        id_motivo, // Supongamos que esto es el motivo del préstamo
      
      } = req.body;

    
      const nuevocliente = await pool.query(
        "INSERT INTO cliente(nombre_cliente, dni, fecha_nacimiento, cantidad_propiedades, cantidad_hijos, genero, id_distrito, id_estadocivil, id_niveleducativo, salario, deudas, id_motivo, id_usuario) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 WHERE id_usuario = $14 RETURNING *;",
        [
          nombre_cliente,
          dni,
          fecha_nacimiento,
          cantidad_propiedades,
          cantidad_hijos,
          genero,
          id_distrito.id_distrito, 
          id_usuario.userId,
          id_estadocivil.id_estadocivil,
          id_niveleducativo.id_niveleducativo,
          salario,
          deudas,
          id_motivo.id_motivo,
       
          
        ]
       
      );
      console.log(nombre_cliente,dni)
      console.log('c')
      // Devolver la respuesta completa
      res.json(nuevocliente.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);    
    }
  };
  export const deleteCliente = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id]);
        if(result.rowCount===0) return res.status(404).json({
            message: "Cliente no encontrado"
        })

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
  };

  export const deleteClientes = async (req, res, next) => {
    const {userId} = req.params;
   
    try {
        const result = await pool.query('DELETE FROM cliente WHERE id_usuario = $1', [userId]);
        if(result.rowCount===0) return res.status(404).json({
            message: "El usuario no ha registrado clientes"
        })

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
  };

  export const deleteAllClientes = async (req, res, next) => {
    console.log('a')
    try {
     
        const result = await pool.query('DELETE FROM cliente');
        if(result.rowCount===0) return res.status(404).json({
            message: "No hay clientes registrados en el sistema"
        })

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
  };

  export const updateCliente = async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        nombre_cliente,
        dni,
        fecha_nacimiento,
        cantidad_propiedades,
        cantidad_hijos,
        genero,
        id_distrito, // Supongamos que esto es el nombre del distrito
        id_usuario,  // Supongamos que esto es el nombre del usuario
        id_estadocivil, // Supongamos que esto es el tipo de estado civil
        id_niveleducativo, // Supongamos que esto es el nivel educativo
        salario,
        deudas,
        id_motivo, // Supongamos que esto es el motivo del préstamo
      } = req.body;

      const result = await pool.query('UPDATE cliente SET nombre_cliente = $1, dni = $2, fecha_nacimiento = $3, cantidad_propiedades = $4, cantidad_hijos = $5, genero = $6,' + 
       ' id_distrito = $7, id_usuario = $8, id_estadocivil = $9, id_niveleducativo = $10, salario = $11, deudas = $12, id_motivo = $13 WHERE id_cliente = $14 RETURNING *', 
       [
          nombre_cliente,
          dni,
          fecha_nacimiento,
          cantidad_propiedades,
          cantidad_hijos,
          genero,
          id_distrito.id_distrito, // Utiliza los IDs correspondientes
          id_usuario.id_usuario,
          id_estadocivil.id_estadocivil,
          id_niveleducativo.id_niveleducativo,
          salario,
          deudas,
          id_motivo.id_motivo,
          id
      ]);
      
      console.log(result);

      if(result.rows.length===0) return res.status(404).json({
          message: "Task not found"
      })
      return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
  };