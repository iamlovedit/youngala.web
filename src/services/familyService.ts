import { HttpRequest } from "@/services/fetch";
import type { HttpResponse } from "@/models/HttpResponse";
import type { FamilyCategory } from "@/models/Family";
import type { Family } from "@/models/Family";
import { PageData } from "@/models/PageData";
const httpRequest = new HttpRequest('family');

function getFamilyCategoriesFetch(): Promise<HttpResponse<FamilyCategory[]>> {
    const promise = httpRequest.getAsync<HttpResponse<FamilyCategory[]>>('/v1/categories');
    return promise;
}
function getFamilyPageByCategoryFetch(categoryId: number | string, pageIndex: number, pageSize: number, sort: string): Promise<HttpResponse<PageData<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageData<Family>>>("/v1/category", {
        categoryId,
        pageIndex,
        pageSize,
        orderField: sort
    })
    return promise;
}
function getFamilyPageByKeywordFetch(keyword: string, pageIndex: number, pageSize: number, sort: string): Promise<HttpResponse<PageData<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageData<Family>>>('/v1/keyword', {
        keyword,
        pageIndex,
        pageSize,
        orderField: sort
    })
    return promise;
}

function getFamilyPageFetech(pageIndex: number, pageSize: number, sort: string): Promise<HttpResponse<PageData<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageData<Family>>>('/v1/all', {
        pageIndex,
        pageSize,
        orderField: sort
    })
    return promise;
}

function filterFamiliePageFetch(categoryId: number | string, keyword: string, pageIndex: number, pageSize: number, sort: string): Promise<HttpResponse<PageData<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageData<Family>>>('/v1', {
        categoryId,
        keyword,
        pageIndex,
        pageSize,
        orderField: sort
    })
    return promise

}

function getFamilyFileByVersionFetch(id: number, version: number) {
    //TODO:
    let route = `/v1/${id}/${version}`;
}

function getFamilyDetailFetch(id: number): Promise<HttpResponse<Family>> {
    const route = `/v1/${id}`
    const promise = httpRequest.getAsync<HttpResponse<Family>>(route);
    return promise;
}
function getFamilyVersionFetch(id: number): Promise<HttpResponse<number[]>> {
    const route = `/v1/versions/${id}`
    const promise = httpRequest.getAsync<HttpResponse<number[]>>(route);
    return promise;
}


export {
    getFamilyCategoriesFetch,
    getFamilyPageFetech,
    getFamilyPageByCategoryFetch,
    getFamilyPageByKeywordFetch,
    getFamilyFileByVersionFetch,
    getFamilyDetailFetch,
    getFamilyVersionFetch,
    filterFamiliePageFetch
}
