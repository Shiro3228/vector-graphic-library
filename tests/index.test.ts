import { describe, expect, test } from 'vitest'
import { addSymbolSet, getSymbolSets, removeSymbolSet } from '../src/index.js';
import { TestUtils } from './testUtils.js';
import type SymbolSet from '../src/classes/SymbolSet.js';

describe('barrel file', () => {
  const set = TestUtils.getSymbolSet();

  test('user can add SymbolSet', () => {
    addSymbolSet(set);
    //checked in next step
  });

  test('user can check added SymbolSets', () => {
    const sets = getSymbolSets();
    expect(sets).toBeDefined();
    expect(sets).toBeInstanceOf(Array);
    expect(sets.length).toBeGreaterThan(0);
  });

  test('user can remove added SymbolSet', () => {
    const setsBeforeRemove = getSymbolSets();
    expect(setsBeforeRemove).toBeDefined();
    expect(setsBeforeRemove).toBeInstanceOf(Array);

    if(setsBeforeRemove.length === 0) addSymbolSet(set);
    expect(getSymbolSets().length).toBeGreaterThan(0);
    removeSymbolSet(set.id);
    expect(getSymbolSets().length).toEqual(0);
  });

});