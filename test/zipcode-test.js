const USPS = require('../').default;
const test = require('ava');

const usps = new USPS({
  userId: "325DAZSE5889"
});

const ZIP = "94607";

test('Zipcode Lookup should return the address with zip', async t => {
  const address = await usps.zipCodeLookup({
    street1: '121 Embarcadero West',
    street2: 'Apt 2205',
    city: 'Oakland',
    state: 'CA'
  });
  t.is(address.Zip5, ZIP);
});

test('Zipcode Lookup should error if address is invalid', async t => {
  const address = await usps.zipCodeLookup({
    street1: 'sdfisd',
    street2: 'Apt 2205',
    city: 'Seattle',
    state: 'WA'
  });
  t.is(address.message,'Address Not Found.');
});

test('Zipcode Lookup should pass error to callback if street is missing', async t => {
  const address = await usps.zipCodeLookup({
    city: 'Oakland',
    state: 'CA'
  });
  t.truthy(address);
});

test('Zipcode Lookup error should be passed to callback if city is missing', async t => {
  const address = await usps.zipCodeLookup({
    street1: '121 Embarcadero West',
    street2: 'Apt 2205',
    state: 'CA'
  });
  t.truthy(address);
});

test('Zipcode Lookup should return an error if the address is fake', async t => {
  const address = await usps.zipCodeLookup({
    street1: '453 sdfsdfa Road',
    street2: 'sdfadf',
    city: 'kojs',
    state: 'LS'
  });
  t.truthy(address);
});
