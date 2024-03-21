from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtSvg import QSvgRenderer
from PyQt5.QtGui import QPainter

class SvgWidget(QWidget):
    def __init__(self, svgFileName):
        super().__init__()
        self.renderer = QSvgRenderer(svgFileName)

    def paintEvent(self, event):
        painter = QPainter(self)
        self.renderer.render(painter)

app = QApplication([])
window = SvgWidget('your_vector_image.svg')
window.show()
app.exec_()
