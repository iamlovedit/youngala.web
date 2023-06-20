interface FamilyCategory {
    id: number;
    parentId: number;
    code: string;
    name: string;
    children: FamilyCategory[];
    parent: FamilyCategory;
}

interface Family {
    id: string;
    name: string;
    createTime: string;
    category: FamilyCategory;
    downloads: number;
    stars: number;
    imageUrl: string
}

export type {
    FamilyCategory,
    Family
}