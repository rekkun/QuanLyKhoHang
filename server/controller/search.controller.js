const { PrismaClient } = require('@prisma/client')
const { getPrismaClient } = require('@prisma/client/runtime/library')
const prisma = new PrismaClient()

const controller = {
  get: {
    componentMapped: (req, res) => {
      const search = async () => {
        if(!req.query.searchString) return res.json({err: true, msg: "searchString must be not empty"})
        // const query = await prisma.$queryRaw`SELECT mapping_Linhkien_Hop.id_linhkien, mapping_Linhkien_Hop.id_hop, mapping_Linhkien_Hop.soLuong, Linhkien.tenLinhKien, Hop.id_hop, Hop.tenHop, Ngan.id_ngan, Ngan.tenNgan, Ke.id_ke, Ke.tenKe FROM mapping_Linhkien_Hop, Linhkien, Hop, Ngan, Ke WHERE MATCH(mapping_Linhkien_Hop.moTa) AGAINST(${req.query.searchString} IN NATURAL LANGUAGE MODE) AND mapping_Linhkien_Hop.id_linhkien = Linhkien.id_linhkien AND mapping_Linhkien_Hop.id_hop = Hop.id_hop AND Hop.id_ngan = Ngan.id_ngan AND Ngan.id_ke = Ke.id_ke;`
        const query = await prisma.mapping_Linhkien_Hop.findMany({
          select: {
            Hop: {
              select: {
                id_hop: true,
                tenHop: true,
                Ngan: {
                  select: {
                    id_ngan: true,
                    tenNgan: true,
                    Ke: {
                      select: {
                        id_ke: true,
                        tenKe: true
                      }
                    }
                  }
                }
              }
            },
            Linhkien: {
              select: {
                id_linhkien: true,
                tenLinhKien: true
              }
            },
            moTa: true,
            soLuong: true
          },
          where: {
            moTa: {
              search: req.query.searchString
            }
          },
          orderBy: {
            id_linhkien: 'desc'
          }
        })
        res.json({err: false, type:"ComponentMapped", msg: query})       
      }
      search()
        .then(async () =>{
          prisma.$disconnect
        })
        .catch(async (error) => {
          console.error(error)
          res.json({err: true, msg: error})
          prisma.$disconnect
        })
    },
    component: (req, res) => {
      const search = async () => {
        if (!req.query.searchString) return res.json({err: true, msg: "searchString is required"})
        const query = await prisma.linhkien.findMany({
          select: {
            id_linhkien: true,
            tenLinhKien: true
          },
          where: {
            tenLinhKien: {
              search: req.query.searchString
            }
          }
        })
        res.json({err: false, type:"Component", msg: query})
      }
      search()
        .then(async () =>{
          prisma.$disconnect
        })
        .catch(async (error) => {
          console.log(error)
          res.json({err: true, msg: error})
          prisma.$disconnect
        })
    },
    shelf: async (req, res) => {
      const getShelfID = async () => {
        const listShelfID = await prisma.ke.findMany({
          select: {
            id_ke: true
          },
          orderBy: {
            id_ke: 'desc'
          }
        })
        res.json({err: false, type:"Shelf", msg: listShelfID})
      }
      getShelfID()
        .then(() => {
          prisma.$disconnect
        })
        .catch(async (err) => {
          console.log(err)
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
        res.json({err: false, type:"Rack", msg: listRackID})
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
        const listCaseID = await prisma.hop.findMany({
          select: {
            id_hop: true
          },
          orderBy: {
            id_hop: 'desc'
          },
          where: {
            id_ngan: req.query.rackID
          }
        })
        res.json({err: false, type:"Case", msg: listCaseID})
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
    componentMapped: (req, res) => {
      const search = async () => {
        if(!req.body.searchString) return res.json({err: true, msg: "searchString is required"})
        // const query = await prisma.$queryRaw`SELECT mapping_Linhkien_Hop.id_linhkien, mapping_Linhkien_Hop.id_hop, mapping_Linhkien_Hop.soLuong, Linhkien.tenLinhKien, Hop.id_hop, Hop.tenHop, Ngan.id_ngan, Ngan.tenNgan, Ke.id_ke, Ke.tenKe FROM mapping_Linhkien_Hop, Linhkien, Hop, Ngan, Ke WHERE MATCH(mapping_Linhkien_Hop.moTa) AGAINST(${req.query.searchString} IN NATURAL LANGUAGE MODE) AND mapping_Linhkien_Hop.id_linhkien = Linhkien.id_linhkien AND mapping_Linhkien_Hop.id_hop = Hop.id_hop AND Hop.id_ngan = Ngan.id_ngan AND Ngan.id_ke = Ke.id_ke;`
        const query = await prisma.mapping_Linhkien_Hop.findMany({
          select: {
            Hop: {
              select: {
                id_hop: true,
                tenHop: true,
                Ngan: {
                  select: {
                    id_ngan: true,
                    tenNgan: true,
                    Ke: {
                      select: {
                        id_ke: true,
                        tenKe: true
                      }
                    }
                  }
                }
              }
            },
            Linhkien: {
              select: {
                id_linhkien: true,
                tenLinhKien: true
              }
            },
            moTa: true,
            soLuong: true
          },
          where: {
            moTa: {
              search: req.body.searchString
            }
          }
        })
        res.json({err: false, type:"ComponentMapped", msg: query})       
      }
      search()
        .then(async () =>{
          prisma.$disconnect
        })
        .catch(async (error) => {
          res.json({err: true, msg: error})
          prisma.$disconnect
        })
    },
    component: (req, res) => {
      const search = async () => {
        if (!req.body.searchString) return res.json({err: true, msg: "searchString is required"})
        const query = await prisma.linhkien.findMany({
          select: {
            id_linhkien: true,
            tenLinhKien: true
          },
          where: {
            tenLinhKien: {
              search: req.body.searchString
            }
          }
        })
        res.json({err: false, type:"Component", msg: query})
      }
      search()
        .then(async () =>{
          prisma.$disconnect
        })
        .catch(async (error) => {
          res.json({err: true, msg: error})
          prisma.$disconnect
        })
    },
    shelf: async (req, res) => {
      const getShelfID = async () => {
        const listShelfID = await prisma.ke.findMany({
          select: {
            id_ke: true
          },
          orderBy: {
            id_ke: 'desc'
          }
        })
        res.json({err: false, type:"Sheld", msg: listShelfID})
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
      if (!req.body.shelfID) return res.json({err: true, msg: "shelfID parameter missing"})
      const getRackID = async () => {
        const listRackID = await prisma.ngan.findMany({
          select: {
            id_ngan: true
          },
          orderBy: {
            id_ngan: 'desc'
          },
          where: {
            id_ke: req.body.shelfID
          }
        })
        res.json({err: false, type:"Rack", msg: listRackID})
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
      if (!req.body.rackID) return res.json({err: true, msg: "rackID parameter missing"})
      const getCaseID = async () => {
        const listCaseID = await prisma.hop.findMany({
          select: {
            id_hop: true
          },
          orderBy: {
            id_hop: 'desc'
          },
          where: {
            id_ngan: req.body.rackID
          }
        })
        res.json({err: false, type:"Case" ,msg: listCaseID})
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
  }
}

module.exports = controller