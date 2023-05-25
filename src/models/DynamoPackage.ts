class PackageVersion {
    id!: string;
    version!: string;
    packageId!: string;
    createTime!: string;
    url!: string;
}

class DynamoPackage {
    name!: string;
    id!: string;
    description!: string;
    downloads!: number;
    updateTime!: string;
    createTime!: string;
    versions!: PackageVersion[];
    votes!: number;
}
export {
    DynamoPackage,
    PackageVersion
}