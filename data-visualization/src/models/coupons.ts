import pipe from "lodash/fp/pipe";
import get from "lodash/fp/get";
import sortBy from "lodash/fp/sortBy";
import filter from "lodash/fp/filter";
import reduce from "lodash/fp/reduce";
import map from "lodash/fp/map";
import countBy from "lodash/fp/countBy";

interface Coupons {
  coupons: Coupon[];
}

interface Coupon {
  country_code: string;
  webshop_id: string;
  first_seen: string;
  promotion_type: string | null;
  value: number | null;
}

interface AggregatedMeanItem {
  value: number;
  accMean: number;
  totalAcc: number;
  retailer: string;
  date: Date;
}

type PromotionType = "percent-off" | "dollar-off";

const mapToValueAndMeanHistory = (promotionType: PromotionType) =>
  pipe<[Coupons], Coupon[], Coupon[], Coupon[], AggregatedMeanItem[]>(
    get("coupons"),
    sortBy((c) => c.first_seen),
    filter((c) => c.promotion_type === promotionType),
    reduce((acc: AggregatedMeanItem[], value) => {
      if (!value.value) {
        return acc;
      }

      const previous = acc.length ? acc[acc.length - 1] : undefined;

      const total = previous ? previous.totalAcc + value.value : value.value;

      const data = {
        value: value.value,
        totalAcc: total,
        accMean: total / (acc.length + 1),
        date: new Date(value.first_seen),
        retailer: value.webshop_id,
      };
      acc.push(data);
      return acc;
    }, [])
  );

const meanPlot = map((data: AggregatedMeanItem) => ({
  x: data.date,
  y: data.accMean,
}));
const valuesPlot = map((data: AggregatedMeanItem) => ({
  x: data.date,
  y: data.value,
}));

const groupByRetailer = pipe(countBy(get("retailer")));

export const getGraphsData = (promotionType: PromotionType, data: Coupons) => {
  const valueAndMeanHistory = mapToValueAndMeanHistory(promotionType)(data);

  const lineChart = [
    {
      items: valuesPlot(valueAndMeanHistory),
      color: "#bf687c",
      legend: "Value",
    },
    {
      items: meanPlot(valueAndMeanHistory),
      color: "#a2a132",
      legend: "Mean",
    },
  ];

  const totalByRetailer = groupByRetailer(valueAndMeanHistory);

  return { lineChart, totalByRetailer };
};
