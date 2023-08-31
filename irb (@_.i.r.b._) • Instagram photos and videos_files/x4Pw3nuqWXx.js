;/*FB_PKG_DELIM*/

__d("useIsThreadBlocked",["I64","LSContactBlockedByViewerStatus","LSIntEnum","LSMessagingThreadTypeUtil","MWPActor.react","MWThreadKey.react","ReQL","ReQLSuspense","useReStore"],(function(a,b,c,d,e,f,g){"use strict";function a(){var a=c("useReStore")(),b=d("MWThreadKey.react").useMWThreadKeyMemoizedExn(),e=d("MWPActor.react").useActor(),g=d("ReQLSuspense").useFirst(function(){return d("ReQL").fromTableAscending(a.table("threads")).getKeyRange(b)},[a,b],f.id+":30"),h=d("ReQLSuspense").useFirst(function(){return(g==null?void 0:g.threadKey)!=null&&(g==null?void 0:g.threadType)!=null&&d("LSMessagingThreadTypeUtil").isOneToOne(g==null?void 0:g.threadType)?d("ReQL").leftJoin(d("ReQL").fromTableAscending(a.table("participants")).getKeyRange(b).filter(function(a){return!d("I64").equal(a.contactId,e)}).take(1),d("ReQL").fromTableAscending(a.table("contacts"))).map(function(a){a[0];a=a[1];return a}):d("ReQL").empty()},[a,b],f.id+":35");if(h!=null)return!d("I64").equal(h.blockedByViewerStatus,d("LSIntEnum").ofNumber(c("LSContactBlockedByViewerStatus").UNBLOCKED));else return!1}g["default"]=a}),98);
__d("LSFeatureLimitsType",[],(function(a,b,c,d,e,f){a=Object.freeze({READ_ONLY:1,GENERIC_READ_ONLY_BLOCK:2,MESSAGE_SEND:4,MESSENGER_ONLY_ACCOUNTS_READ_ONLY_BLOCK:8,MESSAGE_SEND_PRIVATE:16,MESSAGE_SEND_PUBLIC:32});f["default"]=a}),66);
__d("MWPFeatureLimitedData",["I64","LSFeatureLimitsType","LSIntEnum","LSMessagingThreadTypeUtil","ReQL","ReQLSuspense","ServerTime","gkx","useReStore","useServerTime"],(function(a,b,c,d,e,f,g){"use strict";var h=[d("LSIntEnum").ofNumber(c("LSFeatureLimitsType").READ_ONLY),d("LSIntEnum").ofNumber(c("LSFeatureLimitsType").GENERIC_READ_ONLY_BLOCK),d("LSIntEnum").ofNumber(c("LSFeatureLimitsType").MESSAGE_SEND)];function i(a){for(var b=0;b<h.length;b++){var c=h[b];if(d("I64").equal(c,a.type_))return!0}return!1}function j(a,b){return d("I64").equal(d("LSIntEnum").ofNumber(c("LSFeatureLimitsType").MESSAGE_SEND_PUBLIC),a.type_)&&d("LSMessagingThreadTypeUtil").isPublicCMThread(b)&&c("gkx")("9277")}function k(a,b){return d("I64").equal(d("LSIntEnum").ofNumber(c("LSFeatureLimitsType").MESSAGE_SEND_PRIVATE),a.type_)&&d("LSMessagingThreadTypeUtil").isPrivateThread(b)&&c("gkx")("9278")}var l=function(a){var b=d("I64").of_float(d("ServerTime").getMillis()/1e3);return d("ReQL").fromTableAscending(a.table("feature_limits")).filter(function(a){return i(a)&&d("I64").gt(a.expirationTimestampSeconds,b)})},m=function(a,b){var e=d("I64").of_float(c("useServerTime")().valueOf()/1e3);return d("ReQL").fromTableAscending(a.table("feature_limits")).filter(function(a){return(b!=null?i(a)||j(a,b)||k(a,b):i(a))&&d("I64").gt(a.expirationTimestampSeconds,e)})};function a(){var a=c("useReStore")();return d("ReQLSuspense").useFirst(function(){return l(a)},[a],f.id+":116")}function b(a){var b=c("useReStore")(),e=m(b,a);return d("ReQLSuspense").useFirst(function(){return e},[e],f.id+":125")}g.readonlyFeatureLimitQuery=l;g.useReadOnlyFeatureLimitData=a;g.useReadOnlyFeatureLimitDataWithThreadType=b}),98);
__d("useIsReadOnlyFeatureLimited",["MWPFeatureLimitedData","gkx"],(function(a,b,c,d,e,f,g){"use strict";function a(){var a=d("MWPFeatureLimitedData").useReadOnlyFeatureLimitData();if(a!=null)return c("gkx")("1908348");else return!1}g["default"]=a}),98);
__d("MWPMessageHasAttachment",["I64","LSIntEnum"],(function(a,b,c,d,e,f,g){"use strict";function a(a){if(!d("I64").equal(a.displayedContentTypes,d("LSIntEnum").ofNumber(1))&&!d("I64").equal(a.displayedContentTypes,d("I64").add(d("LSIntEnum").ofNumber(1),d("LSIntEnum").ofNumber(8192)))&&!d("I64").equal(a.displayedContentTypes,d("LSIntEnum").ofNumber(128))&&!d("I64").equal(a.displayedContentTypes,d("I64").add(d("LSIntEnum").ofNumber(128),d("LSIntEnum").ofNumber(8192))))return!d("I64").equal(a.displayedContentTypes,d("I64").add(d("LSIntEnum").ofNumber(1),d("LSIntEnum").ofNumber(512)));else return!1}g["default"]=a}),98);
__d("MWPReplyContext.react",["I64","emptyFunction","react","requireDeferred"],(function(a,b,c,d,e,f,g){"use strict";var h=d("react");b=d("react");e=b.createContext;var i=b.useCallback,j=b.useMemo,k=b.useState,l=c("requireDeferred")("MWPReplyLogging").__setRef("MWPReplyContext.react"),m=e({clearReply:c("emptyFunction"),reply:void 0,setReply:c("emptyFunction")});function n(a){try{return JSON.parse(a)}catch(a){return}}function a(a){var b=a.children,c=a.clearThreadReply,e=a.getRepliesState,f=a.persistRepliesState,g=a.senderId;a=a.threadKey;e=e!=null&&a!=null?n(e(d("I64").to_string(a))):void 0;a=k(e);var o=a[0],p=a[1],q=i(function(a,b){l.onReady(function(c){c.logClearReply(b,a,o!=null)});p();if(c!=null)return c(d("I64").to_string(a))},[c,o]),r=i(function(a,b){l.onReady(function(c){c.logSetReply(o,a,b)});p(a);if(f!=null)return f({messageId:a.messageId,offlineThreadingId:a.offlineThreadingId,senderId:g,sendStatusV2:a.sendStatusV2,threadKey:d("I64").to_string(b),timestampMs:a.timestampMs})},[f,o,g]);e=j(function(){return{clearReply:q,reply:o,setReply:r}},[o,r,q]);return h.jsx(m.Provider,{value:e,children:b})}a.displayName=a.name+" [from "+f.id+"]";g.MWPReplyContext=m;g.MWPReplyContextProvider=a}),98);
__d("EmojiRendererData",[],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){}a.isEmoji=function(a){return a>983041||a<35?!1:a===35||a===42||a>=48&&a<=57||a===169||a===174||a===8205||a===8252||a===8265||a===8419||a===8482||a===8505||a>=8596&&a<=8601||a>=8617&&a<=8618||a>=8986&&a<=8987||a===9e3||a===9167||a>=9193&&a<=9203||a>=9208&&a<=9210||a===9410||a>=9642&&a<=9643||a===9654||a===9664||a>=9723&&a<=9726||a>=9728&&a<=9732||a===9742||a===9745||a>=9748&&a<=9749||a===9752||a===9760||a>=9762&&a<=9763||a===9766||a===9770||a>=9774&&a<=9775||a>=9784&&a<=9786||a===9792||a===9794||a>=9800&&a<=9811||a>=9823&&a<=9824||a===9827||a>=9829&&a<=9830||a===9832||a===9851||a>=9854&&a<=9855||a>=9874&&a<=9879||a===9881||a>=9883&&a<=9884||a>=9888&&a<=9889||a===9895||a>=9898&&a<=9899||a>=9904&&a<=9905||a>=9917&&a<=9918||a>=9924&&a<=9925||a===9928||a>=9934&&a<=9935||a===9937||a>=9939&&a<=9940||a>=9961&&a<=9962||a>=9968&&a<=9973||a>=9975&&a<=9976||a===9978||a===9981||a===9986||a===9989||a>=9992&&a<=9993||a===9999||a===10002||a===10004||a===10006||a===10013||a===10017||a===10024||a>=10035&&a<=10036||a===10052||a===10055||a===10060||a===10062||a>=10067&&a<=10069||a===10071||a>=10083&&a<=10084||a>=10133&&a<=10135||a===10145||a===10160||a===10175||a>=10548&&a<=10549||a>=11013&&a<=11015||a>=11035&&a<=11036||a===11088||a===11093||a===12336||a===12349||a===12951||a===12953||a===126980||a===127183||a>=127344&&a<=127345||a>=127358&&a<=127359||a===127374||a>=127377&&a<=127386||a>=127462&&a<=127487||a>=127489&&a<=127490||a===127514||a===127535||a>=127538&&a<=127546||a>=127568&&a<=127569||a>=127744&&a<=127777||a>=127780&&a<=127876||a>=127878&&a<=127891||a>=127894&&a<=127895||a>=127897&&a<=127899||a>=127902&&a<=127937||a>=127941&&a<=127942||a>=127944&&a<=127945||a>=127949&&a<=127984||a>=127987&&a<=127989||a>=127991&&a<=127994||a>=128e3&&a<=128065||a>=128068&&a<=128069||a>=128081&&a<=128101||a>=128121&&a<=128123||a>=128125&&a<=128128||a===128132||a>=128136&&a<=128142||a===128144||a>=128146&&a<=128169||a>=128171&&a<=128253||a>=128255&&a<=128317||a>=128329&&a<=128334||a>=128336&&a<=128359||a>=128367&&a<=128368||a===128371||a>=128374&&a<=128377||a===128391||a>=128394&&a<=128397||a>=128420&&a<=128421||a===128424||a>=128433&&a<=128434||a===128444||a>=128450&&a<=128452||a>=128465&&a<=128467||a>=128476&&a<=128478||a===128481||a===128483||a===128488||a===128495||a===128499||a>=128506&&a<=128580||a>=128584&&a<=128586||a>=128640&&a<=128674||a>=128676&&a<=128691||a>=128695&&a<=128703||a>=128705&&a<=128709||a===128715||a>=128717&&a<=128722||a>=128725&&a<=128727||a>=128732&&a<=128741||a===128745||a>=128747&&a<=128748||a===128752||a>=128755&&a<=128764||a>=128992&&a<=129003||a===129008||a>=129293&&a<=129294||a>=129296&&a<=129303||a>=129312&&a<=129317||a>=129319&&a<=129327||a===129338||a>=129343&&a<=129349||a>=129351&&a<=129398||a>=129400&&a<=129460||a===129463||a===129466||a>=129468&&a<=129484||a===129488||a>=129502&&a<=129535||a>=129648&&a<=129660||a>=129664&&a<=129672||a>=129680&&a<=129725||a>=129727&&a<=129730||a>=129742&&a<=129755||a>=129760&&a<=129768||a>=917536&&a<=917631||a>=983040&&a<=983041};a.isEmojiModifier=function(a){return a>127999||a<127995?!1:a>=127995&&a<=127999};a.isEmojiModifierBase=function(a){return a>129784||a<9757?!1:a===9757||a===9977||a>=9994&&a<=9997||a===127877||a>=127938&&a<=127940||a===127943||a>=127946&&a<=127948||a>=128066&&a<=128067||a>=128070&&a<=128080||a>=128102&&a<=128120||a===128124||a>=128129&&a<=128131||a>=128133&&a<=128135||a===128143||a===128145||a===128170||a>=128372&&a<=128373||a===128378||a===128400||a>=128405&&a<=128406||a>=128581&&a<=128583||a>=128587&&a<=128591||a===128675||a>=128692&&a<=128694||a===128704||a===128716||a===129292||a===129295||a>=129304&&a<=129311||a===129318||a>=129328&&a<=129337||a>=129340&&a<=129342||a===129399||a>=129461&&a<=129462||a>=129464&&a<=129465||a===129467||a>=129485&&a<=129487||a>=129489&&a<=129501||a>=129731&&a<=129733||a>=129776&&a<=129784};a.isEmojiVariationSelector=function(a){return a===65039};a.isNonSpacingCombiningMark=function(a){return a>8419||a<8416?!1:a===8416||a===8419};a.isRegionalIndicator=function(a){return a>127487||a<127462?!1:a>=127462&&a<=127487};a.isTagSpec=function(a){return a>917630||a<917536?!1:a>=917536&&a<=917568||a>=917595&&a<=917630};a.isTagTerm=function(a){return a===917631};a.isText=function(a){return a>8419||a<35?!1:a===35||a===42||a>=48&&a<=57||a===8419};a.isTextVariationSelector=function(a){return a===65038};a.isDefaultTextPresentation=function(a){return a>917631||a<35?!1:a===35||a===42||a>=48&&a<=57||a===169||a===174||a===8205||a===8252||a===8265||a===8419||a===8482||a===8505||a>=8596&&a<=8597||a>=8617&&a<=8618||a===9e3||a===9167||a>=9197&&a<=9199||a>=9201&&a<=9202||a>=9208&&a<=9210||a===9410||a===9654||a===9664||a>=9730&&a<=9732||a===9745||a===9752||a===9760||a>=9762&&a<=9763||a===9766||a===9770||a>=9774&&a<=9775||a>=9784&&a<=9785||a===9792||a===9794||a===9823||a===9851||a===9854||a===9874||a>=9876&&a<=9879||a===9881||a>=9883&&a<=9884||a===9895||a>=9904&&a<=9905||a===9928||a===9935||a===9937||a===9939||a===9961||a>=9968&&a<=9969||a===9972||a>=9975&&a<=9977||a===9997||a===9999||a===10002||a===10004||a===10013||a===10017||a===10052||a===10055||a===10083||a===12336||a>=127344&&a<=127345||a>=127358&&a<=127359||a===127777||a>=127780&&a<=127788||a===127798||a===127869||a>=127894&&a<=127895||a>=127897&&a<=127899||a>=127902&&a<=127903||a>=127947&&a<=127950||a>=127956&&a<=127967||a===127987||a===127989||a===127991||a===128063||a===128065||a===128253||a>=128329&&a<=128330||a>=128367&&a<=128368||a>=128371&&a<=128377||a===128391||a>=128394&&a<=128397||a===128400||a===128421||a===128424||a>=128433&&a<=128434||a===128444||a>=128450&&a<=128452||a>=128465&&a<=128467||a>=128476&&a<=128478||a===128481||a===128483||a===128488||a===128495||a===128499||a===128506||a===128715||a>=128717&&a<=128719||a>=128736&&a<=128741||a===128745||a===128752||a===128755||a>=917536&&a<=917631};a.isSymbol=function(a){return a>8482||a<169?!1:a===169||a===174||a===8482};a.isZWJ=function(a){return a===8205};return a}();e.exports=a}),null);
__d("UnicodeUtils",["invariant"],(function(a,b,c,d,e,f,g,h){"use strict";var i=55296,j=56319,k=56320,l=57343,m=/[\uD800-\uDFFF]/;function n(a){return i<=a&&a<=l}function a(a,b){0<=b&&b<a.length||h(0,1346,b,a.length);if(b+1===a.length)return!1;var c=a.charCodeAt(b);a=a.charCodeAt(b+1);return i<=c&&c<=j&&k<=a&&a<=l}function o(a){return m.test(a)}function p(a,b){return 1+n(a.charCodeAt(b))}function b(a){if(!o(a))return a.length;var b=0;for(var c=0;c<a.length;c+=p(a,c))b++;return b}function c(a,b){return r(a,b,b+1)}function q(a,b,c){var d=b||0;c=c===void 0?Infinity:c||0;if(!o(a))return a.substr(d,c);var e=a.length;if(e<=0||d>e||c<=0)return"";var f=0;if(d>0){for(;d>0&&f<e;d--)f+=p(a,f);if(f>=e)return""}else if(b<0){for(f=e;d<0&&0<f;d++)f-=p(a,f-1);f<0&&(f=0)}b=e;if(c<e)for(b=f;c>0&&b<e;c--)b+=p(a,b);return a.substring(f,b)}function r(a,b,c){b=b||0;c=c===void 0?Infinity:c||0;b<0&&(b=0);c<0&&(c=0);var d=Math.abs(c-b);b=b<c?b:c;return q(a,b,d)}function d(a){var b=[];for(var c=0;c<a.length;c+=p(a,c))b.push(a.codePointAt(c));return b}g.isCodeUnitInSurrogateRange=n;g.isSurrogatePair=a;g.hasSurrogateUnit=o;g.getUTF16Length=p;g.strlen=b;g.charAt=c;g.substr=q;g.substring=r;g.getCodePoints=d}),98);
__d("EmojiRenderer",["EmojiRendererData","UnicodeUtils"],(function(a,b,c,d,e,f,g){var h=0,i=1,j=2,k=3,l=4,m=5,n=6,o=7,p=8,q=9,r=10,s=11;function t(a){var b=a[0];if(b===void 0)return!1;var d=a.length,e=a[d-1];if(e){e=e.charCodeAt(0);if(c("EmojiRendererData").isTagSpec(e))return!1}b=b.charCodeAt(0);if(c("EmojiRendererData").isSymbol(b)&&d<2)return!1;if(c("EmojiRendererData").isText(b))if(d===1)return!1;else if(a.length==2)return c("EmojiRendererData").isNonSpacingCombiningMark(a[1].charCodeAt(0));else{e=1;c("EmojiRendererData").isEmojiVariationSelector(a[e].charCodeAt(0))&&e++;while(e<a.length){if(!c("EmojiRendererData").isNonSpacingCombiningMark(a[e].charCodeAt(0)))return!1;e++}return!0}return!0}function u(a,b){var e=null,f=[],g=p,u=0,v=a.length;while(u<v){var w=a.codePointAt(u),x=d("UnicodeUtils").getUTF16Length(a,u),y=a.substr(u,x);switch(g){case q:c("EmojiRendererData").isRegionalIndicator(w)?g=k:g=p;break;case l:if(c("EmojiRendererData").isEmojiModifier(w)){g=m;break}case h:c("EmojiRendererData").isZWJ(w)?g=o:c("EmojiRendererData").isEmojiVariationSelector(w)?g=j:c("EmojiRendererData").isTextVariationSelector(w)?g=s:c("EmojiRendererData").isNonSpacingCombiningMark(w)?g=i:c("EmojiRendererData").isTagSpec(w)?g=n:g=p;break;case i:case j:if(c("EmojiRendererData").isNonSpacingCombiningMark(w))break;case k:case m:c("EmojiRendererData").isZWJ(w)?g=o:c("EmojiRendererData").isTagSpec(w)?g=n:g=p;break;case n:c("EmojiRendererData").isTagSpec(w)||c("EmojiRendererData").isTagTerm(w)?g=n:g=p;break;case o:c("EmojiRendererData").isRegionalIndicator(w)?g=q:c("EmojiRendererData").isEmojiModifierBase(w)?g=l:c("EmojiRendererData").isEmoji(w)?g=h:g=p;break;case r:c("EmojiRendererData").isNonSpacingCombiningMark(w)?g=i:c("EmojiRendererData").isEmojiVariationSelector(w)?g=j:g=p;break;default:g=p;break}if(g===p){c("EmojiRendererData").isRegionalIndicator(w)?g=q:c("EmojiRendererData").isEmojiModifierBase(w)?g=l:c("EmojiRendererData").isText(w)?g=r:c("EmojiRendererData").isEmoji(w)&&(g=h);if(g!==p){e!==null&&t(e.emoji)&&f.push(e);if(b!==null&&b===f.length){e=null;break}e={emoji:[y],length:x,offset:u}}}else e!==null&&(e.emoji.push(y),e.length+=x);u+=x}e!==null&&t(e.emoji)&&f.push(e);return f}function a(a,b,c){c=u(a);var d=[],e=0;c.forEach(function(c){var f=c.offset;f>e&&d.push(a.substr(e,f-e));var g=b(c.emoji);g!=null&&d.push(g);e=f+c.length});d.push(a.substr(e,a.length-e));return d}function b(a){return u(a,1).length===1}function e(a){return u(a).length}g.parse=u;g.render=a;g.containsEmoji=b;g.countEmoji=e}),98);
__d("ThreadStatus",[],(function(a,b,c,d,e,f){a=Object.freeze({NOT_PAUSED:0,PAUSED:1});f["default"]=a}),66);