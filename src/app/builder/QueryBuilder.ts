import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm
    if (searchTerm) {
      const searchConditions: Record<string, any>[] = []

      searchableFields.forEach(field => {
        searchConditions.push({
          [field]: { $regex: searchTerm, $options: 'i' },
        })
        searchConditions.push({ [field]: { $in: [searchTerm] } }) // Match inside arrays
      })

      if (searchConditions.length > 0) {
        this.modelQuery = this.modelQuery.find({
          $or: searchConditions,
          ...this.modelQuery.getFilter(),
        })
      }
    }
    return this
  }

  filter() {
    const queryObj: Record<string, any> = { ...this.query }

    // Filtering
    const excludeFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'minHourlyRate',
      'maxHourlyRate',
    ]
    excludeFields.forEach(el => delete queryObj[el])

    // Filter by hourly rate range
    if (this.query.minHourlyRate || this.query.maxHourlyRate) {
      queryObj.hourlyRate = {}
      if (this.query.minHourlyRate) {
        queryObj.hourlyRate.$gte = Number(this.query.minHourlyRate)
      }
      if (this.query.maxHourlyRate) {
        queryObj.hourlyRate.$lte = Number(this.query.maxHourlyRate)
      }
    }

    // Filter by rating
    if (this.query.rating) {
      const ratingValue = Number(this.query.rating)
      if (!isNaN(ratingValue)) {
        queryObj['rating.ratingValue'] = { $gte: ratingValue }
        delete queryObj.rating
      }
    }

    

    // Filter by subject
    if (this.query.subject) {
      queryObj.subjects = { $in: [this.query.subject] }
    }

    // Filter by location
    if (this.query.preferedLocation) {
      queryObj.preferedLocation = {
        $regex: this.query.preferedLocation,
        $options: 'i',
      }
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  filterAvailability() {
    if (this?.query?.availability) {
      this.modelQuery = this.modelQuery.find({
        availability: 'available',
      })
    }
    return this
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)

    return this
  }

  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'

    this.modelQuery = this.modelQuery.select(fields)
    return this
  }

  async count() {
    const totalQueries = this.modelQuery.getFilter()
    const totalDoc = await this.modelQuery.model.countDocuments(totalQueries)
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 12
    const totalPage = Math.ceil(totalDoc / limit)

    return {
      page,
      limit,
      totalDoc,
      totalPage,
    }
  }
}

export default QueryBuilder
