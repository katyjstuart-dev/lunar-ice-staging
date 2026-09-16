<?php
const ENQUIRY_TO = 'info@lunarice.co.uk';
const ENQUIRY_FROM = 'info@lunarice.co.uk';
const MAX_ENQUIRY_BYTES = 25000;

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow', true);
header('X-Content-Type-Options: nosniff');
header('Content-Type: text/plain; charset=UTF-8');

$allowed_origins = ['https://www.lunarice.co.uk', 'https://lunarice.co.uk'];
$request_origin = strtolower(rtrim((string)($_SERVER['HTTP_ORIGIN'] ?? ''), '/'));
if ($request_origin !== '' && !in_array($request_origin, $allowed_origins, true)) {
    http_response_code(403);
    exit('Request not accepted');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Method not allowed');
}

if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_ENQUIRY_BYTES) {
    http_response_code(413);
    exit('Enquiry too large');
}

// Hidden honeypot: genuine customers never complete this field.
if (trim((string)($_POST['website'] ?? '')) !== '') {
    header('Location: /contact.html?sent=1', true, 303);
    exit;
}

function clean_line($value, $maximum = 200) {
    $value = trim(str_replace(["\r", "\n", "\0"], ' ', (string)$value));
    return function_exists('mb_substr') ? mb_substr($value, 0, $maximum) : substr($value, 0, $maximum);
}

function clean_message($value, $maximum = 3000) {
    $value = trim(str_replace("\0", '', (string)$value));
    return function_exists('mb_substr') ? mb_substr($value, 0, $maximum) : substr($value, 0, $maximum);
}

$name = clean_line($_POST['name'] ?? '', 100);
$telephone = clean_line($_POST['telephone'] ?? '', 40);
$email_raw = clean_line($_POST['email'] ?? '', 254);
$repeat_raw = clean_line($_POST['repeat_email'] ?? '', 254);
$email = filter_var($email_raw, FILTER_VALIDATE_EMAIL);
$repeat = filter_var($repeat_raw, FILTER_VALIDATE_EMAIL);
$delivery_date = clean_line($_POST['delivery_date'] ?? '', 10);
$delivery_time = clean_line($_POST['delivery_time'] ?? '', 80);
$postcode = strtoupper(clean_line($_POST['postcode'] ?? '', 12));
$ice_type = clean_line($_POST['ice_type'] ?? '', 20);
$purpose = clean_line($_POST['purpose'] ?? '', 80);
$quantity = clean_line($_POST['quantity'] ?? '', 80);
$heard = clean_line($_POST['heard'] ?? '', 160);
$message = clean_message($_POST['message'] ?? '');

$allowed_ice_types = ['Cubed', 'Crushed', 'Cubed and Crushed'];
$allowed_purposes = ['Ice for Chilling', 'Ice for Drinking', 'Ice for Chilling and Drinking', 'Other'];
$date_parts = explode('-', $delivery_date);
$valid_date = count($date_parts) === 3
    && preg_match('/^\d{4}-\d{2}-\d{2}$/', $delivery_date) === 1
    && checkdate((int)$date_parts[1], (int)$date_parts[2], (int)$date_parts[0]);

if (!$name || !$telephone || !$email || !$repeat || strtolower($email) !== strtolower($repeat)
    || !$valid_date || !$delivery_time || !$postcode || !$purpose || !$quantity || !$heard || !$message
    || !in_array($ice_type, $allowed_ice_types, true)
    || !in_array($purpose, $allowed_purposes, true)) {
    http_response_code(400);
    exit('Please check the required fields and make sure both email addresses match.');
}

$fields = [
    'Name' => $name,
    'Telephone' => $telephone,
    'Email' => $email,
    'Delivery date' => $delivery_date,
    'Preferred 2-hour slot' => $delivery_time,
    'Delivery postcode' => $postcode,
    'Ice type' => $ice_type,
    'Purpose' => $purpose,
    'Quantity' => $quantity,
    'How they heard about us' => $heard,
    'Message' => $message,
];

$body = "New Lunar Ice website enquiry\n\n";
foreach ($fields as $label => $value) {
    $body .= $label . ': ' . $value . "\n";
}

$subject = 'New Lunar Ice website enquiry - ' . $delivery_date . ' - ' . $postcode;
$headers = [
    'From: Lunar Ice Website <' . ENQUIRY_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = @mail(
    ENQUIRY_TO,
    $subject,
    wordwrap($body, 78),
    implode("\r\n", $headers),
    '-f' . ENQUIRY_FROM
);
if ($sent) {
    header('Location: /contact.html?sent=1', true, 303);
    exit;
}

error_log('Lunar Ice website enquiry could not be handed to the mail server.');
header('Location: /contact.html?sent=0', true, 303);
exit;
?>
