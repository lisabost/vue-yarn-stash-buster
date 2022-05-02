function Pattern() {
    this.free = false;
    this.id = 0;
    this.name = '';
    this.permalink = '';
    this.personal_attributes = {};
    this.first_photo = {};
    this.designer = {};
    this.pattern_author = {};
    this.pattern_sources = [];
    this.comments_count = 0;
    this.created_at = null;
    this.currency = '';
    this.difficulty_average = 0;
    this.difficulty_count = 0;
    this.downloadable = false;
    this.favorites_count = 0;
    this.guage = 0;
    this.guage_divisor = 0;
    this.gauge_pattern = '';
    this.generally_available = null;
    this.price = 0;
    this.projects_count = 0;
    this.published = null;
    this.queued_projects_count = 0;
    this.rating_average = 0;
    this.rating_count = 0;
    this.row_guage = 0;
    this.updated_at = null;
    this.url = '';
    this.yardage = 0;
    this.yardage_max = 0;
    this.sizes_available = {};
    this.product_id = 0;
    this.currency_symbol = '';
    this.ravelry_download = false;
    this.download_location = {};
    this.pdf_in_library = false;
    this.volumes_in_library = [];
    this.guage_description = '';
    this.yarn_weight_description = '';
    this.pattern_needle_size = [];
    this.notes_html = '';
    this.notes = '';
    this.packs = [];
    this.printings = [];
    this.yarn_weight = {};
    this.craft = {};
    this.pattern_categories = [];
    this.pattern_attributes = [];

    this.toString = function() {
        return this.name;
    }

    this.toFirestore = function() {
        return {
            name: this.name,
            pattern_author: this.pattern_author,
            first_photo: this.photos[0],
            permalink: this.permalink,
            notes: this.notes_html,
            price: this.price,
            currency: this.currency,
            yardage: this.yardage,
            weight: this.yarn_weight
        }
    }
}

export default Pattern;