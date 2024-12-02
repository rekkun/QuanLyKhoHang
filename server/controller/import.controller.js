const { PrismaClient } = require('@prisma/client')
const { getPrismaClient } = require('@prisma/client/runtime/library')
const prisma = new PrismaClient()

const controller = {
  post: {
    component: async (req, res) => {
      if (!req.body.name || !req.body.quantity) return res.json({err: true, msg: "Name and Quantity are required"})
      const importComponent = async (req, res) => {
        let getLastID ={}
        try {
          getLastID = await prisma.linhkien.findFirstOrThrow({
            select: {
              id_linhkien: true
            },
            orderBy: {
              id_linhkien: 'desc'
            }
          })
        } catch (err) {
          getLastID.id_linhkien = "LK_000000";
        }
        const lastID = getLastID.id_linhkien.split('_')
        const nextID = `${lastID[0]}_${String(Number.parseInt(lastID[1])+1).padStart(6, '0')}`
        await prisma.linhkien.create({
          data: {
            id_linhkien: nextID,
            tenLinhKien: req.body.name,
            soLuong: req.body.quantity
          }
        })
        return res.json({err: false, msg: "Component successfully imported"})
      }
      importComponent(req, res)
        .then(async () =>{
          prisma.$disconnect
        })
        .catch(async (err) => {
          await prisma.$disconnect
          return res.json({err: true, msg: `Can't import component:\n${err}`})
        })
    },
    componentMapped: async (req, res) => {
      if (!req.body.componentID ||!req.body.caseID  || !req.body.rackID || !req.body.shelfID || !req.body.quantity || !req.body.description) return res.json({err: true, msg: "ComponentID, CaseID, RackID, ShelfID, Quantity and Description are required"})
      const importComponentMapped = async (req, res) => {
        await prisma.mapping_linhkien_hop.create({
          data: {
            id_linhkien: req.body.componentID,
            id_hop: req.body.caseID,
            id_ngan: req.body.rackID,
            id_ke: req.body.shelfID,
            soLuong: req.body.quantity,
            moTa: req.body.description
          }
        })
        return res.json({err: false, msg: "Component mapped successfully"})
      }
      importComponentMapped(req, res)
        .then(async () => {
          prisma.$disconnect
        })
        .catch(async (err) => {
          await prisma.$disconnect
          return res.json({err: true, msg: `Can't import component mapped:\n${err}`})
        })
    },
    case: async (req, res) => {
      if (!req.body.name || !req.body.description || !req.body.rackID || !req.body.shelfID) return res.json({err: true, msg:"Name, Description, RackID and ShelfID are required"})
      const importCase = async (req, res) => {
        let getLastID;
        try {
          getLastID = await prisma.hop.findFirstOrThrow({
          select: {
            id_hop: true
          },
          orderBy: {
            id_hop: 'desc'
          },
          where: {
            id_ngan: req.body.rackID,
            id_ke: req.body.shelfID
          }
        })
        } catch (err) {
          getLastID = 0;
        }
        const lastID = getLastID.id_hop || 0;
        const nextID = `${String(Number.parseInt(lastID)+1)}`
        await prisma.hop.create({
          data: {
            id_hop: nextID,
            id_ngan: req.body.rackID,
            id_ke: req.body.shelfID,
            tenHop: req.body.name,
            moTa: req.body.description
          }
        })
        return res.json({err: false, msg: "Case successfully imported"})
      }
      importCase(req, res)
        .then(async () => {
          prisma.$disconnect
        })
        .catch(async (err) => {
          await prisma.$disconnect
          return res.json({err: true, msg: `Can't import case:\n${err}`})
        })
    },
    rack: async (req, res) => {
      if (!req.body.name || !req.body.description || !req.body.shelfID) return res.json({err:true, msg:"Name, Description and ShelfID are required"})
      const importRack = async (req, res) => {
      let getLastID;
      try {
        getLastID = await prisma.ngan.findFirstOrThrow({
          select: {
            id_ngan: true,
            id_ke: true
          },
          orderBy: {
            id_ngan: 'desc'
          },
          where: {
            id_ke: req.body.shelfID
          }
        })
      } catch (error) {
        getLastID = 0;
      }
      const lastID = getLastID.id_ngan || 0
      const nextID = `${String(Number.parseInt(lastID)+1)}`
      await prisma.ngan.create({
        data: {
          id_ngan: nextID,
          id_ke: req.body.shelfID,
          tenNgan: req.body.name,
          moTa: req.body.description
        }
      })
      res.json({err: false, msg:"Rack successfully imported"})
    }
    importRack(req, res)
      .then(() => {
        prisma.$disconnect
      })
      .catch(async (err) => {
        await prisma.$disconnect
        return res.json({err: true, msg: `Can't import rack:\n${err}`})
      })
    },
    shelf: async (req, res) => {
      if (!req.body.name || !req.body.description || !req.body.shelfID) return res.json({err: true, msg:"Name, Description and ShelfID are required"})
      const importShelf = async (req, res) => {
        let getListShelfID;
        try {
          getListShelfID = await prisma.ke.findUniqueOrThrow({
          select: {
            id_ke: true
          },
          where: {
            id_ke: req.body.shelfID
          }
        })
        } catch (err) {
          getListShelfID = 0;
        } 
        if(getListShelfID.id_ke) return res.json({err: true, msg:"ShelfID already exists"})
        await prisma.ke.create({
          data: {
            id_ke: req.body.shelfID,
            tenKe: req.body.name,
            moTa: req.body.description
          }
        })
        res.json({err: false, msg:"Shelf successfully imported"})
      }
      importShelf(req, res)
        .then(() => {
          prisma.$disconnect
        })
        .catch(async (err) => {
          await prisma.$disconnect
          return res.json({err: true, msg: `Can't import shelf:\n${err}`})
        })
    }
  }
}

module.exports = controller