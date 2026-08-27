class QueryBuilder {
  constructor(modelQuery, query) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // ses akhane amar sharif 
  search(searchableFields) {
    const { searchTerm } = this.query;
  
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
  
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => {
          // Apply regex search only for string fields
          return typeof field === "string"
            ? { [field]: searchRegex }
            : { [field]: searchTerm };
        }),
      });
    }
  
    return this;
  }
  
  // range query
  range(dateField = "createdAt") {
    const startRange = this.query.startRange;
    const endRange = this.query.endRange;
  
    if (startRange || endRange) {
      const rangeFilter = {};
  
      if (startRange) {
        rangeFilter.$gte = new Date(startRange);
      }
  
      if (endRange) {
        // Include the full day up to 23:59:59.999
        const endDate = new Date(endRange);
        endDate.setHours(23, 59, 59, 999);
        rangeFilter.$lte = endDate;
      }
  
      this.modelQuery = this.modelQuery.find({
        [dateField]: rangeFilter,
      });
    }
  
    return this;
  }


  //   filter query
  filter() {
    const queryObject = { ...this.query };
    // remove fields from query
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
      "startRange",
      "endRange",
    ];

    excludeFields.forEach((el) => delete queryObject[el]);

    this.modelQuery = this.modelQuery.find(queryObject);
    return this;
  }

  //   sort query
  sort() {
    const sort = this?.query?.sort?.split(",").join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  //   limit query
  limit() {
    const limit = Number(this?.query?.limit) || 100;
    this.modelQuery = this.modelQuery.limit(limit);
    return this;
  }

  // pagination query
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // field limiting
  fields() {
    const fields = this?.query?.fields?.split(",").join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();

    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
    };
  }
}

export default QueryBuilder;
