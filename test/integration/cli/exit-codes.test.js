'use strict';

const assert = require('proclaim');
const runPa11yCli = require('../helper/pa11y-cli');

describe('CLI exit codes', () => {
	let pa11yResponse;

	describe('when Pa11y is run on a page with no errors', () => {

		before(async () => {
			pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/notices`);
		});

		it('exits with a code of `0`', () => {
			assert.strictEqual(pa11yResponse.exitCode, 0);
		});

	});

	describe('when Pa11y is run on a page with errors', () => {

		before(async () => {
			pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/errors`);
		});

		it('exits with a code of `2`', () => {
			assert.strictEqual(pa11yResponse.exitCode, 2);
		});

	});

	// This has to be skipped for now, some ISPs hijack hostnames that can't
	// be resolved (looking at you TalkTalk). We could do with finding a better
	// way to test this later
	describe.skip('when Pa11y is run on a page that can\'t be loaded', () => {

		before(async () => {
			pa11yResponse = await runPa11yCli('notahost');
		});

		it('exits with a code of `1`', () => {
			assert.strictEqual(pa11yResponse.exitCode, 1);
		});

	});

	describe('when the `--level` flag is set to "warning"', () => {

		describe('and Pa11y is run on a page with no warnings or errors', () => {

			before(async () => {
				pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/notices`, {
					arguments: [
						'--include-notices',
						'--include-warnings',
						'--level', 'warning'
					]
				});
			});

			it('exits with a code of `0`', () => {
				assert.strictEqual(pa11yResponse.exitCode, 0);
			});

		});

		describe('and Pa11y is run on a page with warnings', () => {

			before(async () => {
				pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/warnings`, {
					arguments: [
						'--include-notices',
						'--include-warnings',
						'--level', 'warning'
					]
				});
			});

			it('exits with a code of `2`', () => {
				assert.strictEqual(pa11yResponse.exitCode, 2);
			});

		});

	});

	describe('when the `level` config is set to "warning"', () => {

		describe('and Pa11y is run on a page with no warnings or errors', () => {

			before(async () => {
				pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/notices`, {
					arguments: [
						'--config', './mock/config/level-warning.json',
						'--include-notices',
						'--include-warnings'
					]
				});
			});

			it('exits with a code of `0`', () => {
				assert.strictEqual(pa11yResponse.exitCode, 0);
			});

		});

		describe('and Pa11y is run on a page with warnings', () => {

			before(async () => {
				pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/warnings`, {
					arguments: [
						'--config', './mock/config/level-warning.json',
						'--include-notices',
						'--include-warnings'
					]
				});
			});

			it('exits with a code of `2`', () => {
				assert.strictEqual(pa11yResponse.exitCode, 2);
			});

		});

	});

	describe('when the `level` config is set to "warning" but the `--level` flag is set to "notice"', () => {

		describe('and Pa11y is run on a page with no notices, warnings, or errors', () => {

			before(async () => {
				pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/notices`, {
					arguments: [
						'--config', './mock/config/level-warning.json',
						'--include-notices',
						'--include-warnings',
						'--level', 'notice',
						// We can't build a page that doesn't include notices, so we have
						// to fake it by ignoring all the notices
						'--ignore', 'WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_3.1_3_2.G57',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_3.1_3_3.G96',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_4.1_4_4.G142',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131',
						'--ignore', 'WCAG2AA.Principle3.Guideline3_1.3_1_2.H58',
						'--ignore', 'WCAG2AA.Principle3.Guideline3_2.3_2_3.G61',
						'--ignore', 'WCAG2AA.Principle3.Guideline3_2.3_2_4.G197',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel'
					]
				});
			});

			it('exits with a code of `0`', () => {
				assert.strictEqual(pa11yResponse.exitCode, 0);
			});

		});

		describe('and Pa11y is run on a page with notices', () => {

			before(async () => {
				pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/notices`, {
					arguments: [
						'--config', './mock/config/level-warning.json',
						'--include-notices',
						'--include-warnings',
						'--level', 'notice'
					]
				});
			});

			it('exits with a code of `2`', () => {
				assert.strictEqual(pa11yResponse.exitCode, 2);
			});

		});

	});

	describe('when the `--level` flag is set to "notice"', () => {

		describe('and Pa11y is run on a page with no notices, warnings, or errors', () => {

			before(async () => {
				pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/notices`, {
					arguments: [
						'--include-notices',
						'--include-warnings',
						'--level', 'notice',
						// We can't build a page that doesn't include notices, so we have
						// to fake it by ignoring all the notices
						'--ignore', 'WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_3.1_3_2.G57',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_3.1_3_3.G96',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_4.1_4_4.G142',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185',
						'--ignore', 'WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131',
						'--ignore', 'WCAG2AA.Principle3.Guideline3_1.3_1_2.H58',
						'--ignore', 'WCAG2AA.Principle3.Guideline3_2.3_2_3.G61',
						'--ignore', 'WCAG2AA.Principle3.Guideline3_2.3_2_4.G197',
						'--ignore', 'WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel'
					]
				});
			});

			it('exits with a code of `0`', () => {
				assert.strictEqual(pa11yResponse.exitCode, 0);
			});

		});

		describe('and Pa11y is run on a page with notices', () => {

			before(async () => {
				pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/notices`, {
					arguments: [
						'--include-notices',
						'--include-warnings',
						'--level', 'notice'
					]
				});
			});

			it('exits with a code of `2`', () => {
				assert.strictEqual(pa11yResponse.exitCode, 2);
			});

		});

	});

	describe('when the `threshold` config is set to more than the number of errors present', () => {

		before(async () => {
			pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/many-errors`, {
				arguments: [
					'--config', './mock/config/threshold-large.json',
					'--include-notices',
					'--include-warnings'
				]
			});
		});

		it('exits with a code of `0`', () => {
			assert.strictEqual(pa11yResponse.exitCode, 0);
		});

	});

	describe('when the `threshold` config is set to less than the number of errors present but the `--threshold` flag is set to more', () => {

		before(async () => {
			pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/many-errors`, {
				arguments: [
					'--config', './mock/config/threshold-small.json',
					'--include-notices',
					'--include-warnings',
					'--threshold', '5'
				]
			});
		});

		it('exits with a code of `0`', () => {
			assert.strictEqual(pa11yResponse.exitCode, 0);
		});

	});

	describe('when the `--threshold` flag is set to more than the number of errors present', () => {

		before(async () => {
			pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/many-errors`, {
				arguments: [
					'--include-notices',
					'--include-warnings',
					'--threshold', '5'
				]
			});
		});

		it('exits with a code of `0`', () => {
			assert.strictEqual(pa11yResponse.exitCode, 0);
		});

	});

	describe('when the `--threshold` flag is set to exactly the number of errors present', () => {

		before(async () => {
			pa11yResponse = await runPa11yCli(`${global.mockWebsiteAddress}/many-errors`, {
				arguments: [
					'--include-notices',
					'--include-warnings',
					'--threshold', '4'
				]
			});
		});

		it('exits with a code of `0`', () => {
			assert.strictEqual(pa11yResponse.exitCode, 0);
		});

	});

});
