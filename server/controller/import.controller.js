const { PrismaClient } = require('@prisma/client')
const { getPrismaClient } = require('@prisma/client/runtime/library')
const prisma = new PrismaClient()

const controller = {
  get: {
    shelf: async (req, res) => {
      const getShelfID = async () => {
        const listShelfID = await prisma.hop.findMany({
          select: {
            id_hop: true
          },
          orderBy: {
            id_hop: 'desc'
          }
        })
        res.json({err: false, listShelfID: listShelfID})
      }
      getShelfID()
        .then(() => {
          prisma.$disconnect
        })
        .catch(async () => {
           await prisma.$disconnect
           return res.json({err: true, msg: "Can't get list shelf ID"})
        })
    },
    rack: async (req, res) => {
      if (!req.query.shelfID) return res.json({err: true, msg: "shelfID parameter missing"})
      const getRackID = async () => {
        const listRackID = await prisma.ngan.findMany({
          select: {
            id_ngan: true
          },
          orderBy: {
            id_ngan: 'desc'
          },
          where: {
            id_ke: req.query.shelfID
          }
        })
        res.json({err: false, listRackID: listRackID})
      }
      getRackID()
        .then(() => {
          prisma.$disconnect
        })
        .catch(async () => {
           await prisma.$disconnect
           return res.json({err: true, msg: "Can't get list rack ID"})
        })
    },
    case: async (req, res) => {
      if (!req.query.rackID) return res.json({err: true, msg: "rackID parameter missing"})
      const getCaseID = async () => {
        const listCaseID = await prisma.ngan.findMany({
          select: {
            id_ngan: true
          },
          orderBy: {
            id_ngan: 'desc'
          },
          where: {
            id_ke: req.query.rackID
          }
        })
        res.json({err: false, listRackID: listCaseID})
      }
      getCaseID()
        .then(() => {
          prisma.$disconnect
        })
        .catch(async () => {
           await prisma.$disconnect
           return res.json({err: true, msg: "Can't get list case ID"})
        })
    }
  },
  post: {
    component: async (req, res) => {
      if (!req.body.name || !req.body.quantity) return res.json({err: true, msg: "Name and Quantity are required"})
      const importComponent = async (req, res) => {
        const getLastID = await prisma.linhkien.findFirst({
          select: {
            id_linhkien: true
          },
          orderBy: {
            id_linhkien: 'desc'
          }
        })
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
    case: async (req, res) => {
      if (!req.body.name || !req.body.description || !req.body.rackID) return res.json({err: true, msg:"Name, Description and RackID are required"})
      const importCase = async (req, res) => {
        const getLastID = await prisma.hop.findFirst({
          select: {
            id_hop: true
          },
          orderBy: {
            id_hop: 'desc'
          }
        })
        const lastID = getLastID.id_hop.split('_')
        const nextID = `${lastID[0]}_${String(Number.parseInt(lastID[1])+1).padStart(3, '0')}`
        await prisma.hop.create({
          data: {
            id_hop: nextID,
            id_ngan: req.body.rackID,
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
        const getLastID = await prisma.ngan.findFirst({
          select: {
            id_ngan: true
          },
          orderBy: {
            id_ngan: 'desc'
          },
          where: {
            id_key: req.body.shelfID
          }
        })
        const lastID = getLastID.id_ngan.split('_')
        const nextID = `${lastID[0]}_${String(Number.parseInt(lastID[1])+1).padStart(2, '0')}`
        await prisma.ngan.create({
          data: {
            id_ngan: nextID,
            id_ke: req.body.ShelfID,
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
        const getListShelfID = await prisma.ke.findFirst({
          select: {
            id_ke: true
          },
          orderBy: {
            id_ke: 'desc'
          },
          where: {
            id_key: req.body.shelfID
          }
        })
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