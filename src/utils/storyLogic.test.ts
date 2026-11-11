import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getDefaultStoryConfig,
  validateStoryConfig,
  calculateDaysTogether,
  ROMANTIC_CHORDS,
  REVEAL_CHIME_NOTES,
  USER_ASSET_SWANS
} from './storyLogic';

test('getDefaultStoryConfig returns complete romantic configuration with required keys', () => {
  const config = getDefaultStoryConfig();
  assert.equal(typeof config.proposerName, 'string');
  assert.equal(typeof config.recipientName, 'string');
  assert.equal(config.proposalQuestion, 'WILL YOU MARRY ME?');
  assert.ok(config.milestones.length >= 5);
  assert.ok(config.galleryPhotos.length >= 5);
  assert.ok(config.loveLetterContent.length >= 4);

  // Check that the user's uploaded swan asset is wired into the story milestones and gallery
  const hasSwanMilestone = config.milestones.some((m) => m.imageUrl === USER_ASSET_SWANS);
  assert.ok(hasSwanMilestone, 'Should include user swan asset in milestones');
  const hasSwanGallery = config.galleryPhotos.some((g) => g.url === USER_ASSET_SWANS);
  assert.ok(hasSwanGallery, 'Should include user swan asset in gallery');
});

test('validateStoryConfig correctly validates valid and invalid configs', () => {
  const valid = getDefaultStoryConfig();
  const validRes = validateStoryConfig(valid);
  assert.equal(validRes.isValid, true);
  assert.equal(validRes.errors.length, 0);

  const invalid = { ...valid, recipientName: '', proposalQuestion: '' };
  const invalidRes = validateStoryConfig(invalid);
  assert.equal(invalidRes.isValid, false);
  assert.ok(invalidRes.errors.some((e) => e.includes('Recipient')));
  assert.ok(invalidRes.errors.some((e) => e.includes('Proposal question')));
});

test('calculateDaysTogether accurately calculates day count between dates', () => {
  const ref = new Date('2024-01-01T00:00:00Z');
  const start = '2023-12-01T00:00:00Z';
  const days = calculateDaysTogether(start, ref);
  assert.equal(days, 31);

  // Returns 0 for invalid dates or future dates
  assert.equal(calculateDaysTogether('', ref), 0);
  assert.equal(calculateDaysTogether('invalid-date', ref), 0);
});

test('ROMANTIC_CHORDS and REVEAL_CHIME_NOTES provide valid harmonic frequency values', () => {
  assert.ok(ROMANTIC_CHORDS.length >= 4);
  for (const chord of ROMANTIC_CHORDS) {
    assert.ok(Array.isArray(chord));
    assert.ok(chord.length >= 4);
    for (const freq of chord) {
      assert.ok(freq > 50 && freq < 2000, `Frequency ${freq} should be within musical audio range`);
    }
  }

  assert.ok(REVEAL_CHIME_NOTES.length >= 5);
  for (const freq of REVEAL_CHIME_NOTES) {
    assert.ok(freq > 200 && freq < 3000);
  }
});
