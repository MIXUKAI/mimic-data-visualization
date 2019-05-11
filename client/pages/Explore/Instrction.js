import React from 'react'
import '../Home/Home.css'

const Instruction = (props) => {
  return (
    <div style={{paddingTop: '130px'}}>
      <h2 className="home-container-h2">说明</h2>
      <p className="home-container-p">探索选项卡允许根据您选择的选择和可视变量对数据库进行总体概述。 默认情况下，将选择整个数据库; 但是，如果您希望选择不同的特定群组，该选项也可用。</p>
      <p className="home-container-p">在本节中，默认情况下不会选择已显示为灰色或颜色模糊的信息。 如果您希望包含或排除信息，请选择或取消选择相应的选项。 在选择标准中选择或取消选择的选项决定了您选择的队列。 选择的选项越多，结果越少，结果越少。</p>
      <p className="home-container-p">视觉选项中的全部或无按钮将分别快速选择部分中的全部或全部选项。 其他部分也可以选择特定的变量类型。 某些变量在每个重症监护室（ICU）停留时被多次测量，并且需要从ICU住院中选择入院，出院，最低，最高或平均值。 这将该选项应用于整个变量部分。 默认情况下，Admission是此情况下的默认选择选项。</p>
      <p className="home-container-p">要处理或完成可视化，请按照以下步骤操作：</p>
      <ul>
        <li>通过在下面相应的“选择标准”面板中选择您选择的条件来选择患者群组</li>
        <li>通过选择或取消选择相应类别下的选项，选择您希望可视化的变量</li>
        <li>单击“绘图”按钮。 此过程大约需要一分钟才能完成，如果需要更长时间，请再试一次并刷新页面</li>
        <li>此部分中的视觉效果通过计数数据的直方图和分类数据的饼图显示</li>
        <li>如果您想要想象一个不同的队列，请再次按照步骤1到4进行操作</li>
      </ul>
    </div>
  )
}

export default Instruction
