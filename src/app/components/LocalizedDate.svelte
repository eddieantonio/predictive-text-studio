<script lang="ts">
  import { date } from "svelte-i18n";

  export let isodate: string;

  /** Return the ISO date as a localtime Date object. */
  function asLocalTimeDate() {
    const match = /^(\d+)-(\d{1,2})-(\d{1,2})$/.exec(isodate);

    if (!match) {
      throw new Error(`Invalid ISO date: ${isodate} (expecting yyyy-mm-dd)`);
    }

    const [, year, month, day] = match;
    /*
     * Although you COULD use the Date constructor to parse the ISO date, it's
     * STONGLY DISCOURAGED, since different browser implememt different
     * parsing heuristics! 😱
     * It also assumes the date is in UTC, which is NOT what we want!
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#Timestamp_string
     */
    return new Date(+year, +month - 1, +day);
  }
</script>

<time datetime={isodate}>{$date(asLocalTimeDate(), { format: 'long' })}</time>
