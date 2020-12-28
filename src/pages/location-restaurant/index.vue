<template name="fade">
  <b-overlay :show="loading" variant="transparent" spinner-variant="danger" rounded="md">
    <b-navbar type="dark" variant="danger" sticky>
      <div class="d-flex w-100 align-items-center justify-content-end">
        <b-form-input v-model="textSearch.query"
                      size="sm"
                      type="search"
                      class="mr-1"
                      style="width: 300px"
                      @keyup.enter="onTextSearch(false)"
                      placeholder="Nearby restaurants">
        </b-form-input>
        <b-button size="sm"
                  class="my-2 my-sm-0"
                  variant="light"
                  @click="onTextSearch(false)"
                  type="button">
          <b-icon icon="search"/>
        </b-button>
      </div>
    </b-navbar>
    <div class="py-3" v-if="locationList.length > 0">
      <b-card v-for="(location, index) in locationList"
              :key="index"
              no-body
              class="overflow-hidden mb-3">
        <b-row no-gutters>
          <b-col md="6">
            <div v-if="location.photos && location.photos.length > 0"
                 class="h-100 p-3 d-flex justify-content-center align-items-center"
            >
              <b-img-lazy v-bind="cardImageProps"
                          :src="location.photos[0].src" :alt="location.name"
                          thumbnail
                          class="rounded-0"
                          blank-width="300"
                          blank-height="300"
              >
              </b-img-lazy>
            </div>
            <div v-else
                 class="h-100 p-3 d-flex justify-content-center align-items-center"
            >
              <b-img-lazy v-bind="cardImageProps"
                          :src="require('../../assets/images/img-not-found.png')" alt="Image Not Found"
                          thumbnail
                          class="rounded-0"
                          blank-width="300"
                          blank-height="300"
              >
              </b-img-lazy>
            </div>
          </b-col>
          <b-col md="6">
            <b-card-body class="d-flex flex-column justify-content-center h-100">
              <div class="d-flex align-items-center mb-1">
                <div class="icon-block">
                  <b-img-lazy :src="location.icon" alt="Image Not Found"
                              thumbnail
                              class="border-0"
                              width="30"
                              height="30"
                              blank-width="30"
                              blank-height="30"
                  >
                  </b-img-lazy>
                </div>
                <strong>{{ location.name }}</strong>
              </div>
              <div class="d-flex align-items-center mb-1">
                <div class="icon-block">
                  <b-icon class="location-icon" icon="geo-alt-fill"/>
                </div>
                {{ location.formatted_address }}
              </div>
              <div class="d-flex align-items-center mb-1">
                <div class="icon-block">
                  <b-icon class="cash-icon" icon="cash-stack"/>
                </div>
                {{ location.price_rate }}
              </div>
              <div class="d-flex align-items-center mb-1">
                <div class="icon-block">
                  <b-icon class="clock-icon" icon="clock"/>
                </div>
                <span :class="onCheckOpenState(location.opening_hours)"
                >
                  {{ location.opening_hours | openState }}
                </span>
              </div>
              <b-row class="align-items-center">
                <b-form-rating :value="location.rating"
                               variant="warning"
                               no-border
                               size="md"
                               inline
                               readonly
                               show-value
                               show-value-max
                               class="py-0"
                               blank-height="300"
                               blank-width="300"
                               style="box-shadow: none"
                ></b-form-rating>
                <small class="px-1">{{ location.user_ratings_total }} reviews</small>
              </b-row>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-row class="justify-content-center" v-show="loadMore">
        <b-button variant="outline-info" @click="onTextSearch(true)">More</b-button>
      </b-row>
    </div>
    <div v-else>
      <b-alert show variant="warning" class="text-center my-3">Search result not found.</b-alert>
    </div>
    <loading-item v-show="loading"></loading-item>
  </b-overlay>
</template>

<script>
import {GoogleMapsService} from "../../services"
import LoadingItem from "../../components/location/LoadingItem"

export default {
  name: "index",
  components: {
    LoadingItem
  },
  data() {
    return {
      loading: true,
      loadMore: false,
      locationList: [],
      textSearch: {
        query: 'Bang sue',
        language: 'en',
        region: 'th',
        type: 'restaurant',
        next_page_token: ''
      },
      cardImageProps: {
        blank: true,
        blankColor: '#bbb',
        width: 300,
        height: 300,
      }
    }
  },
  filters: {
    openState(openingHours) {
      let state;
      if (openingHours) {
        if (openingHours.open_now) {
          state = 'Open';
        } else {
          state = 'Closed';
        }
      } else {
        state = 'No information'
      }
      return state;
    }
  },
  async created() {
    await this.onTextSearch();
  },
  methods: {
    async onTextSearch(mergeData = false) {
      this.loading = true;
      this.loadMore = false;
      let locations;
      try {
        if (mergeData === false) {
          this.textSearch.next_page_token = '';
        }
        locations = await GoogleMapsService.textSearch(this.textSearch);
        if (mergeData) {
          this.onMergeLocationList(locations.data.results)
        } else {
          this.onSetLocationList(locations.data.results)
        }
        this.textSearch.next_page_token = locations.data.next_page_token
        this.loadMore = !!this.textSearch.next_page_token
      } catch (e) {
        console.log('[Error]onTextSearch', e)
      }
      this.loading = false
    },
    onSetLocationList(newLocationList) {
      this.locationList = newLocationList
    },
    onMergeLocationList(newLocationList) {
      this.locationList = [
        ...this.locationList,
        ...newLocationList
      ]
    },
    onCheckOpenState(openingHours) {
      let classObject = {
        'text-success': false,
        'text-danger': false
      };

      if (openingHours) {
        if (openingHours.open_now) {
          classObject["text-success"] = true
        } else {
          classObject["text-danger"] = true
        }
      }
      return classObject;
    }
  }
}
</script>

<style lang="scss" scoped>
$icon-size: 25px;
.icon-block {
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  //border: 1px solid #dee2e6;
}

.location-icon {
  color: #ef2623;
  font-size: 35px;
  margin-right: 10px;
  margin-left: 10px;
}

.cash-icon {
  color: #0e390e;
  font-size: $icon-size;
}

.clock-icon {
  font-size: $icon-size;
}
</style>