export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_beverageVariant {
	primaryPhoto?: ComplexImage,
	size?: string,
	name: string,
	c_containerType?: string,
	c_parentBeverage?: EntityReference[],
	c_price?: number,
	id: string,
}
