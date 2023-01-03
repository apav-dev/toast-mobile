export interface EntityReference {
	entityId: string,
	name: string,
}

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

export interface C_categoryPhotos {
	photo: ComplexImage,
	name: string,
	slug?: string,
}

export default interface Ce_beverageCategory {
	slug?: string,
	name: string,
	c_beverages?: EntityReference[],
	c_categoryPhotos?: C_categoryPhotos[],
	c_parentCategory?: EntityReference[],
	c_searchSlug?: string,
	c_subCategories?: EntityReference[],
	id: string,
}
