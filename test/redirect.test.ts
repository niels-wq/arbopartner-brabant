import assert from "node:assert/strict";
import test from "node:test";
import { bareHost, wwwRedirectLocation } from "../server/redirect.mjs";

test("apex gaat met 301-bestemming naar www, pad en query blijven", () => {
  assert.equal(bareHost("ArboPartnerBrabant.nl:443"), "arbopartnerbrabant.nl");
  assert.equal(
    wwwRedirectLocation("/tarieven", "?blok=10", "arbopartnerbrabant.nl", undefined),
    "https://www.arbopartnerbrabant.nl/tarieven?blok=10",
  );
  assert.equal(
    wwwRedirectLocation("/", "", "arbopartnerbrabant.nl", undefined),
    "https://www.arbopartnerbrabant.nl/",
  );
  assert.equal(
    wwwRedirectLocation("/diensten/", "?x=1", "arbopartnerbrabant.nl", undefined),
    "https://www.arbopartnerbrabant.nl/diensten/?x=1",
  );
});

test("www, localhost en een railway-host zonder apex blijven staan", () => {
  assert.equal(wwwRedirectLocation("/", "", "www.arbopartnerbrabant.nl", "arbopartnerbrabant.nl"), null);
  assert.equal(wwwRedirectLocation("/tarieven", "", "localhost:4327", undefined), null);
  assert.equal(wwwRedirectLocation("/", "", "example.up.railway.app", undefined), null);
});

test("een proxy die de apex in x-forwarded-host zet, wijst ook naar www", () => {
  assert.equal(
    wwwRedirectLocation("/contact", "?bron=mail", "example.up.railway.app", "arbopartnerbrabant.nl"),
    "https://www.arbopartnerbrabant.nl/contact?bron=mail",
  );
});
