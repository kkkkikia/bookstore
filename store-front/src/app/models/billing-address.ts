import { Order } from './order';

export class BillingAddress {
	public id : number;
	public billingAddressName: string;
	public billingAddressStreet1: string;
	public billingAddressStreet2: string;
	public billingAddressCity: string;
	public billingAddressCountry: string;
	public billingAddressState: string;
	public billingAddressZipcode: string;
	public order: Order;
}
