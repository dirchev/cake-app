import CakeAPI from './api'

let api = new CakeAPI()

it('creates cake', function () {
  return api.create({
    name: 'Test',
    comment: 'Test Comment',
    imageUrl: 'https://homeschooledbaking.files.wordpress.com/2012/06/battenberg-1-img_4020.jpg',
    yumFactor: 4
  }).then((result) => {
    expect(result).toBeDefined()
  })
})