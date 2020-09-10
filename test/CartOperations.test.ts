/**
 * @timbouc/cart
 *
 * @license MIT
 * @copyright Timbouc - Augustus Okoye<augustus@timbouc.com>
 */

import path from 'path';
import { Cart } from '../src';
const { expect } = require('chai');

const cart = new Cart({
	default: 'local',
	storages: {
		local: {
			driver: 'local',
			config: {
				path: path.join(__dirname, 'test.storage.file'),
			},
		},
	},
});

describe('Cart Operations', async () => {
	it('add to cart', async () => {
		//
	});
});
