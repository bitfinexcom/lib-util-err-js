## Classes

<dl>
<dt><a href="#GenericError">GenericError</a></dt>
<dd><p>Generic api error, useful for hiding errors like connection failures</p>
</dd>
<dt><a href="#UserError">UserError</a></dt>
<dd><p>User friendly error that is shown directly to endusers</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#apiErrorHandler">apiErrorHandler(err, [basename], [opts], cb)</a></dt>
<dd><p>Error handler utility that is useful for hiding internal errors from endusers</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ErrorCallbackFunction">ErrorCallbackFunction</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

<a name="GenericError"></a>

## GenericError
Generic api error, useful for hiding errors like connection failures

**Kind**: global class  
<a name="new_GenericError_new"></a>

### new GenericError([basename])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [basename] | <code>string</code> | <code>null</code> | Optional, error message prefix |

<a name="UserError"></a>

## UserError
User friendly error that is shown directly to endusers

**Kind**: global class  
<a name="new_UserError_new"></a>

### new UserError(message, [basename], [code])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | Error message |
| [basename] | <code>string</code> | <code>null</code> | Optional, error message prefix |
| [code] | <code>number</code> | <code></code> | Optional, error code, default is bfx generic error |

<a name="apiErrorHandler"></a>

## apiErrorHandler(err, [basename], [opts], cb)
Error handler utility that is useful for hiding internal errors from endusers

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Original error |
| [basename] | <code>string</code> | Optional, error base message |
| [opts] | <code>Object</code> | Optional, error handling options |
| [opts.force] | <code>boolean</code> | Optional, force original error message |
| cb | [<code>ErrorCallbackFunction</code>](#ErrorCallbackFunction) | Callback function in format: `(err) => void` |

<a name="ErrorCallbackFunction"></a>

## ErrorCallbackFunction ⇒ <code>void</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 

