export interface MetaData {
    currentPage: number,
    totalPages: number,
    pageSize: number,
    totalCount: number
    //There should be no typo, should match with backend code
}

export class PaginatedResponse<T> {
    items: T;
    metaData: MetaData;

    constructor(items: T, metaData: MetaData)
    {
        this.items = items,
        this.metaData = metaData
    }
}