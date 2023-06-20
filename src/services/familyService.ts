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

function filterFamiliePageFetch(keyword: string | undefined, categoryId: number | string | undefined, pageIndex: number, pageSize: number, sort: string): Promise<HttpResponse<PageData<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageData<Family>>>('/v1', {
        keyword: keyword,
        categoryId: categoryId,
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
    getFamilyFileByVersionFetch,
    getFamilyDetailFetch,
    getFamilyVersionFetch,
    filterFamiliePageFetch
}
