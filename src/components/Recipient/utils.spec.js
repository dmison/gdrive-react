/* global describe it */
import {expect} from 'chai';
import {isValid, getEmail} from './utils.js';

describe('isValid()', () => {

  it('should return true if last element is an email address', ()=>{
    const detail = 'Jane Doe djoe@anon.com';
    const actual = isValid(detail);
    expect(actual).to.be.true;
  });

  it('should return false if last element is not an an email address', ()=>{
    const detail = 'Jane Doe';
    const actual = isValid(detail);
    expect(actual).to.be.false;
  });

});


describe('getEmail()', () => {
  it('should return an email if the recipient is valid', () => {
    const detail = 'Jane Doe djoe@anon.com';
    const actual = getEmail(detail);
    expect(actual).to.equal('djoe@anon.com');
  });

  it('should not return an email if the recipient is not valid', () => {
    const detail = 'Jane Doe';
    const actual = getEmail(detail);
    expect(actual).to.equal('');
  });

});
