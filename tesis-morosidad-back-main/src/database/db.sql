-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-09-16 02:29:05.304

-- tables
-- Table: Cliente
CREATE TABLE Cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre_cliente varchar(80)  NOT NULL,
    dni varchar(8)  NOT NULL,
    fecha_nacimiento date  NOT NULL,
    cantidad_propiedades int  NOT NULL,
    cantidad_hijos int  NOT NULL,
    genero boolean  NOT NULL,
    id_distrito SERIAL  NOT NULL,
    id_usuario SERIAL  NOT NULL,
    id_estadocivil SERIAL  NOT NULL,
    id_niveleducativo SERIAL  NOT NULL,
salario int  NOT NULL,
    deudas int  NOT NULL,
id_motivo SERIAL  NOT NULL

);

-- Table: Distrito
CREATE TABLE Distrito (
    id_distrito SERIAL PRIMARY KEY,
    nombre_distrito varchar(30)  NOT NULL,
    id_region SERIAL  NOT NULL
);

-- Table: Estado_civil
CREATE TABLE Estado_civil (
    id_estadocivil SERIAL PRIMARY KEY,
    tipo_de_estado varchar(20)  NOT NULL
   );

-- Table: Moroso
CREATE TABLE Moroso (
    id_moroso SERIAL PRIMARY KEY,
    porcentaje_morosidad decimal(2)  NOT NULL,
    id_cliente SERIAL  NOT NULL
    );

-- Table: Motivo_prestamo
CREATE TABLE Motivo_prestamo (
    id_motivo SERIAL PRIMARY KEY,
    motivo varchar(30)  NOT NULL
    );

-- Table: Nivel_educativo
CREATE TABLE Nivel_educativo (
    id_niveleducativo SERIAL PRIMARY KEY,
    nivel_educativo varchar(30)  NOT NULL
);

-- Table: Region
CREATE TABLE Region (
    id_region SERIAL PRIMARY KEY,
    nombre_region varchar(30)  NOT NULL
);

-- Table: Usuario
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario varchar(100)  NOT NULL,
    email varchar(80)  NOT NULL,
    contrasena varchar(10)  NOT NULL
 );

-- foreign keys
-- Reference: Cliente_Distrito (table: Cliente)
ALTER TABLE Cliente ADD CONSTRAINT Cliente_Distrito
    FOREIGN KEY (id_distrito)
    REFERENCES Distrito (id_distrito)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Cliente_Estado_civil (table: Cliente)
ALTER TABLE Cliente ADD CONSTRAINT Cliente_Estado_civil
    FOREIGN KEY (id_estadocivil)
    REFERENCES Estado_civil (id_estadocivil)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Cliente_Motivo_prestamo (table: Cliente)
ALTER TABLE Cliente ADD CONSTRAINT Cliente_Motivo_prestamo 
    FOREIGN KEY (id_motivo)
    REFERENCES Motivo_prestamo(id_motivo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Cliente_Nivel_educativo (table: Cliente)
ALTER TABLE Cliente ADD CONSTRAINT Cliente_Nivel_educativo
    FOREIGN KEY (id_niveleducativo)
    REFERENCES Nivel_educativo (id_niveleducativo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Distrito_Region (table: Distrito)
ALTER TABLE Distrito ADD CONSTRAINT Distrito_Region
    FOREIGN KEY (id_region)
    REFERENCES Region (id_region)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Moroso_Cliente (table: Moroso)
ALTER TABLE Moroso ADD CONSTRAINT Moroso_Cliente
    FOREIGN KEY (id_cliente)
    REFERENCES Cliente (id_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Table_2_Usuario (table: Cliente)
ALTER TABLE Cliente ADD CONSTRAINT Table_2_Usuario
    FOREIGN KEY (id_usuario)
    REFERENCES Usuario (id_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

