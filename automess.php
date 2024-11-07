// api -----------------------------------------------------------------------

use App\Http\Controllers\AutoResponseController;

Route::post('/auto-response', [AutoResponseController::class, 'getResponse']);



// Controller -----------------------------------------------------------------------
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AutoResponseController extends Controller
{
    public function getResponse(Request $request)
    {
        // Bạn có thể thêm logic để xử lý câu hỏi và trả lời
        $query = $request->input('query');
        $response = $this->generateResponse($query);
        
        return response()->json(['response' => $response]);
    }

    private function generateResponse($query)
    {
        // Logic trả lời tự động đơn giản (ví dụ: nếu có từ khóa trong câu hỏi)
        if (strpos(strtolower($query), 'hello') !== false) {
            return 'Hello! How can I help you?';
        }

        return 'I am sorry, I do not understand your question.';
    }
}
